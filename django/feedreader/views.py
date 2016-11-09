import json

from django.conf import settings
from django.http import HttpResponse

from .models import Entry, Feed


def get_feeds(request):
    feeds = Feed.objects.all()

    data = json.dumps([{'feedTitle': feed.title,
                        'groupName': feed.group.name if feed.group else ''}
                        for feed in feeds])

    return HttpResponse(data, content_type='application/json')


def get_entries(request):
    entries = Entry.objects.all().order_by('-published_time')[:settings.MAX_ENTRIES_SHOWN]

    data = json.dumps([{'title': entry.title,
                        'link': entry.link,
                        'description': entry.description,
                        'publishedTime': entry.published_time.strftime('%Y-%m-%d %H:%M:%S'),
                        'feedTitle': entry.feed.title,
                        'groupName': entry.feed.group.name if entry.feed.group else ''}
                        for entry in entries])

    return HttpResponse(data, content_type='application/json')
