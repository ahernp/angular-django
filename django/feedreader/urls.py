from django.conf.urls import url

from . import views

urlpatterns = [
    url(regex=r'^recententries$', view=views.get_recent_entries, name='entries'),
    url(regex=r'^deletefeed', view=views.delete_feed, name='delete_feed'),
    url(regex=r'^feeds$', view=views.get_feeds, name='feeds'),
    url(regex=r'^groups$', view=views.get_groups, name='groups'),
    url(regex=r'^markallread$', view=views.mark_all_read, name='mark_all_read'),
    url(regex=r'^savefeed', view=views.save_feed, name='save_feed'),
    url(regex=r'^toggleread$', view=views.toggle_read, name='toggle_read'),
]
