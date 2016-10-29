import json

from django.conf import settings
from django.http import HttpResponse

from .models import Entry


def get_entries(request):
    entries = Entry.objects.all().order_by('-published_time')[:settings.MAX_ENTRIES_SHOWN]

    data = json.dumps([{'title': entry.title,
                        'link': entry.link,
                        'description': entry.description,
                        'published_time': entry.published_time.strftime('%Y-%m-%d %H:%M:%S'),
                        'feed': entry.feed.title} for entry in entries])

    return HttpResponse(data, content_type='application/json')
