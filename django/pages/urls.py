from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^all/$',
        views.all_pages,
        name='all_pages'),
    url(regex=r'^read/(?P<slug>[-\w]+)$',
        view=views.read_page,
        name='read_page'),
    url(regex=r'^save$',
        view=views.save_page,
        name='save_page'),
]
