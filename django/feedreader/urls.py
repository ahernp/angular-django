from django.conf.urls import url

from . import views

urlpatterns = [
    url(regex=r'^entries$', view=views.get_entries, name='entries'),
    url(regex=r'^feeds$', view=views.get_feeds, name='feeds'),
    url(regex=r'^groups$', view=views.get_groups, name='groups'),
    url(regex=r'^markallread$', view=views.mark_all_read, name='mark_all_read'),
    url(regex=r'^toggleread$', view=views.toggle_read, name='toggle_read'),
]
