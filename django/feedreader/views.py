from datetime import datetime, timedelta
import json

from django.conf import settings
from django.core.exceptions import PermissionDenied
from django.http import HttpResponse

from .models import Entry, Feed, Group


def get_recent_entries(request):
    from_time = datetime.utcnow() - timedelta(days=settings.MAX_DAYS_SHOWN)

    entries = Entry.objects.filter(published_time__gt=from_time)\
        .order_by('-published_time')[:settings.MAX_ENTRIES_SHOWN]

    if not entries:
        entries = Entry.objects.all().order_by('-published_time')[:settings.MAX_ENTRIES_SHOWN]

    data = json.dumps([entry.dictionary for entry in entries])

    return HttpResponse(data, content_type='application/json')


def get_groups(request):
    groups = Group.objects.all()

    data = json.dumps([group.dictionary for group in groups])

    return HttpResponse(data, content_type='application/json')

def get_feeds(request):
    feeds = Feed.objects.all()

    data = json.dumps([feed.dictionary for feed in feeds])

    return HttpResponse(data, content_type='application/json')


def toggle_read(request):
    if not request.user.is_authenticated:
        raise PermissionDenied

    json_data=json.loads(request.body)

    if 'entry_id' in json_data:
        try:
            entry = Entry.objects.get(pk=json_data['entry_id'])
            entry.read_flag = not entry.read_flag
            entry.save()
        except Entry.DoesNotExist:
            pass

    return HttpResponse('')


def mark_all_read(request):
    if not request.user.is_authenticated:
        raise PermissionDenied

    Entry.objects.filter(read_flag=False).update(read_flag=True)

    return HttpResponse('')
