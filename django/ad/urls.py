from django.conf.urls import url, include
from django.contrib import admin

from pages.views import HomePageView

urlpatterns = [
    url(r'^$', HomePageView.as_view(), name='homepage'),
    url(r'^api/pages/', include('pages.urls')),
    url(r'^api/site/', include('monitoring.urls')),
    url(r'^admin/', admin.site.urls),
    #url(r'^.*$', HomePageView.as_view(), name='homepage_redirect'),
]
