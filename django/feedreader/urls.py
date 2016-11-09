from django.conf.urls import url

from .views import get_entries, get_feeds

urlpatterns = [
    url(regex=r'^feeds$', view=get_feeds, name='feeds'),
    url(regex=r'^entries$', view=get_entries, name='entries'),
]
