from django.conf.urls import url

from .views import get_entries, get_feeds, toggle_read, mark_all_read

urlpatterns = [
    url(regex=r'^feeds$', view=get_feeds, name='feeds'),
    url(regex=r'^entries$', view=get_entries, name='entries'),
    url(regex=r'^toggleread$', view=toggle_read, name='toggle_read'),
    url(regex=r'^markallread$', view=mark_all_read, name='mark_all_read'),
]
