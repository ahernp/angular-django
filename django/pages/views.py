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
    data = json.dumps([page.get_breadcrumb_dictionary for page in pages])
    return HttpResponse(data, content_type='application/json')


def read_page(request, slug):
    parent = Page.objects.get(slug=slug)
    parent_dictionary = parent.dictionary
    children = Page.objects.filter(parent=parent).order_by('title')
    parent_dictionary['children'] = [child.breadcrumb_dictionary for child in children]
    return HttpResponse(json.dumps(parent_dictionary), content_type='application/json')


def child_pages(request, parent_slug, limit=3):
    parent = Page.objects.get(slug=parent_slug)
    pages = Page.objects.filter(parent=parent).order_by('-published')[:limit]
    data = json.dumps([page.dictionary for page in pages])
    return HttpResponse(data, content_type='application/json')


class HomePageView(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super(HomePageView, self).get_context_data(**kwargs)
        context['DEBUG'] = settings.DEBUG
        return context
