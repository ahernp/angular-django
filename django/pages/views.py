import json

from django.conf import settings
from django.http import HttpResponse
from django.views.generic import TemplateView

from pages.models import Page


def all_pages(request):
    pages = Page.objects.all()
    data = [page.dictionary for page in pages]
    return HttpResponse(json.dumps(data), content_type='application/json')


def read_page(request, slug):
    try:
        page = Page.objects.get(slug=slug)
        data = page.dictionary
    except Page.DoesNotExist:
        data = {'title': 'Page Not Found'}
    return HttpResponse(json.dumps(data), content_type='application/json')


class HomePageView(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super(HomePageView, self).get_context_data(**kwargs)
        context['DEBUG'] = settings.DEBUG
        return context
