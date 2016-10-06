import json

from django.conf import settings
from django.http import HttpResponse
from django.views.generic import TemplateView

from pages.models import Page


def list_pages(request):
    parent_slug = request.GET.get('parent_slug')
    if parent_slug:
        parent = Page.objects.get(slug=parent_slug)
        pages = Page.objects.filter(parent=parent)
    else:
        pages = Page.objects.all()
    data = json.dumps([{'title': page.title,
                        'url': '/page/%s' % page.slug,
                        'updated': page.updated.strftime('%Y-%m-%d %H:%M:%S'),
                        'parentName': page.parent.title} for page in pages])
    return HttpResponse(data, content_type='application/json')


def read_page(request, slug):
    page = Page.objects.get(slug=slug)
    return HttpResponse(page.json, content_type='application/json')


def child_pages(request, parent_slug, limit=3):
    parent = Page.objects.get(slug=parent_slug)
    pages = Page.objects.filter(parent=parent).order_by('-published')[:limit]
    data = '[%s]' % ', '.join([page.json for page in pages])
    return HttpResponse(data, content_type='application/json')


class HomePageView(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super(HomePageView, self).get_context_data(**kwargs)
        context['DEBUG'] = settings.DEBUG
        return context
