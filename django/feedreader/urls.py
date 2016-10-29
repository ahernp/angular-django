from django.conf.urls import url

from .views import get_entries

urlpatterns = [
    url(regex=r'^$', view=get_entries, name='entries'),
]
