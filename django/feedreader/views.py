from datetime import datetime, timedelta
import json

from django.conf import settings
from django.contrib.auth.decorators import login_required
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


@login_required
def mark_all_read(request):
    if not request.user.is_authenticated:
        raise PermissionDenied

    Entry.objects.filter(read_flag=False).update(read_flag=True)

    return HttpResponse('')


@login_required
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


def get_feeds(request):
    feeds = Feed.objects.all()

    data = json.dumps([feed.dictionary for feed in feeds])

    return HttpResponse(data, content_type='application/json')


@login_required
def delete_feed(request):
    feed_dict = json.loads(request.body)

    if 'id' in feed_dict and feed_dict['id']:
        try:
            Feed.objects.get(pk=feed_dict['id']).delete()
        except Feed.DoesNotExist:
            pass

    return HttpResponse('')


@login_required
def save_feed(request):
    new_feed_dict = json.loads(request.body)
    if 'id' in new_feed_dict and new_feed_dict['id']:
        feed = Feed.objects.get(pk=new_feed_dict['id'])
    else:
        feed = Feed.objects.create(xml_url = new_feed_dict['feedUrl'])

    if 'groupId' in new_feed_dict and new_feed_dict['groupId']:
        feed.group_id = new_feed_dict['groupId']

    feed.save()

    data = json.dumps(feed.dictionary)

    return HttpResponse(data, content_type='application/json')


def get_groups(request):
    groups = Group.objects.all()

    data = json.dumps([group.dictionary for group in groups])

    return HttpResponse(data, content_type='application/json')


@login_required
def delete_group(request):
    group_dict = json.loads(request.body)

    if 'id' in group_dict and group_dict['id']:
        try:
            Group.objects.get(pk=group_dict['id']).delete()
        except Feed.DoesNotExist:
            pass

    return HttpResponse('')


@login_required
def save_group(request):
    new_group_dict = json.loads(request.body)
    if 'id' in new_group_dict and new_group_dict['id']:
        group = Group.objects.get(pk=new_group_dict['id'])
        group.name = new_group_dict['name']
    else:
        group = Group.objects.create(name = new_group_dict['name'])

    group.save()

    data = json.dumps(group.dictionary)

    return HttpResponse(data, content_type='application/json')
