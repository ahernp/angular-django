from django.conf.urls import url, include
from django.contrib import admin

from blog.rss import LatestBlogPostsFeed
from pages.views import HomePageView

urlpatterns = [
    url(r'^$', HomePageView.as_view(), name='homepage'),
    url(r'^api/pages/', include('pages.urls')),
    url(r'^api/dashboard/', include('dashboard.urls')),
    url(r'^admin/', admin.site.urls),
    url(r'^blog/feed$', LatestBlogPostsFeed(), name='feed'),
    url(r'^.*$', HomePageView.as_view(), name='homepage_redirect'),
]
