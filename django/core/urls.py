from django.conf.urls import url

from .views import check_logged_in, do_login, do_logout

urlpatterns = [
    url(regex=r'^checkloggedin$', view=check_logged_in, name='check_logged_in'),
    url(regex=r'^login$', view=do_login, name='login'),
    url(regex=r'^logout$', view=do_logout, name='logout'),
]
