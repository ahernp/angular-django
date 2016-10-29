from django.conf.urls import url

from .views import EntryList

urlpatterns = [
    url(regex=r'^$', view=EntryList.as_view(), name='feed_list'),
]
