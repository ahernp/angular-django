from django.conf.urls import url

from .views import check_logged_in

urlpatterns = [
    url(regex=r'^checkloggedin/$', view=check_logged_in, name='check_logged_in'),
]
