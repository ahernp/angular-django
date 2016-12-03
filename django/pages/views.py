import json

from django.conf import settings
from django.http import HttpResponse
from django.views.generic import TemplateView

from pages.models import Page


def all_pages(request):
    pages = Page.objects.all()
    page_dicts = []
    for page in pages:
        page_dict = page.dictionary
        children = Page.objects.filter(parent=page).order_by('title')
        page_dict['children'] = [child.breadcrumb_dictionary for child in children]
        page_dicts.append(page_dict)
    data = json.dumps(page_dicts)
    return HttpResponse(data, content_type='application/json')


def read_page(request, slug):
    try:
        parent = Page.objects.get(slug=slug)
        data = parent.dictionary
        children = Page.objects.filter(parent=parent).order_by('title')
        data['children'] = [child.breadcrumb_dictionary for child in children]
    except Page.DoesNotExist:
        data = {'title': 'Page Not Found'}
    return HttpResponse(json.dumps(data), content_type='application/json')


class HomePageView(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super(HomePageView, self).get_context_data(**kwargs)
        context['DEBUG'] = settings.DEBUG
        return context
