from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^list$', views.list_pages, name='list_pages'),
    url(regex=r'^childpages/(?P<parent_slug>[-\w]+)$', view=views.child_pages, name='read_child_pages'),
    url(regex=r'^read/(?P<slug>[-\w]+)$', view=views.read_page, name='read_page'),
]
