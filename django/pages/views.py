import json

from django.http import HttpResponse
from django.views.generic import TemplateView

from pages.models import Page


def list_pages(request):
    pages = Page.objects.all()
    data = json.dumps([{'title': page.title,
                        'url': '/page/%s' % page.slug,
                        'updated': page.updated.strftime('%Y-%m-%d %H:%M:%S'),
                        'parentName': page.parent.title} for page in pages])
    return HttpResponse(data, content_type='application/json')


def read_page(request, slug):
    page = Page.objects.get(slug=slug)
    data = json.dumps({'id': page.id,
                       'title': page.title,
                       'url': '/page/%s' % page.slug,
                       'parentName': page.parent.title,
                       'updated': page.updated.strftime('%Y-%m-%d %H:%M:%S'),
                       'published': page.published.strftime('%Y-%m-%d') if page.published else '',
                       'content': page.content})
    return HttpResponse(data, content_type='application/json')


class HomePageView(TemplateView):

    template_name = 'index.html'
