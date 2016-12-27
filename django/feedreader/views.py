from datetime import datetime, timedelta
import json

from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse

from .models import Entry, Feed


def get_feeds(request):
    feeds = Feed.objects.all()

    data = json.dumps([{'feedTitle': feed.title,
                        'groupName': feed.group.name if feed.group else ''}
                       for feed in feeds])

    return HttpResponse(data, content_type='application/json')


def get_entries(request):
    from_time = datetime.utcnow() - timedelta(days=settings.MAX_DAYS_SHOWN)

    entries = Entry.objects.filter(published_time__gt=from_time)\
        .order_by('-published_time')[:settings.MAX_ENTRIES_SHOWN]

    data = json.dumps([{'id': entry.id,
                        'title': entry.title,
                        'link': entry.link,
                        'description': entry.description,
                        'publishedTime': entry.published_time.strftime('%Y-%m-%d %H:%M:%S'),
                        'feedTitle': entry.feed.title,
                        'groupName': entry.feed.group.name if entry.feed.group else '',
                        'readFlag': entry.read_flag}
                       for entry in entries])

    return HttpResponse(data, content_type='application/json')


@login_required
def toggle_read(request):
    json_data=json.loads(request.body)

    if 'entry_id' in json_data:
        try:
            entry = Entry.objects.get(pk=json_data['entry_id'])
            entry.read_flag = not entry.read_flag
            entry.save()
        except Entry.DoesNotExist:
            pass
    return HttpResponse('')


@login_required
def mark_all_read(request):
    Entry.objects.filter(read_flag=False).update(read_flag=True)
    return HttpResponse('')
