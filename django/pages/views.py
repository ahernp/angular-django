import json

from django.core import serializers
from django.http import HttpResponse

from pages.models import Page


def list_pages(request):
    pages = Page.objects.all()
    data = json.dumps([{'title': page.title, 'slug': page.slug} for page in pages])
    return HttpResponse(data, content_type='application/json')


def read_page(request, slug):
    page = Page.objects.get(slug=slug)
    data = serializers.serialize("json", [page])
    return HttpResponse(data, content_type='application/json')
