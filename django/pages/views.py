import json

from django.core import serializers
from django.http import HttpResponse
from django.views.generic import TemplateView

from pages.models import Page


def list_pages(request):
    pages = Page.objects.all()
    data = json.dumps([{'title': page.title, 'slug': page.slug} for page in pages])
    return HttpResponse(data, content_type='application/json')


def read_page(request, slug):
    page = Page.objects.get(slug=slug)
    data = json.dumps({'id': page.id,
                       'title': page.title,
                       'slug': page.slug,
                       'parent': page.parent_id,
                       'updated': page.updated.strftime('%Y-%m-%d %H:%M:%S'),
                       'content': page.content})
    return HttpResponse(data, content_type='application/json')

class HomePageView(TemplateView):

    template_name = 'index.html'
