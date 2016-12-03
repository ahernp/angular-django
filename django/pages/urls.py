from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^all/$',
        views.all_pages,
        name='all_pages'),
    url(r'^list/$',
        views.list_pages,
        name='list_pages'),
    url(regex=r'^blogpages/$',
        view=views.recent_blog_pages,
        name='recent_blog_pages'),
    url(regex=r'^read/(?P<slug>[-\w]+)$',
        view=views.read_page,
        name='read_page'),
]
