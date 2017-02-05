import json

from datetime import datetime

from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.views.generic import TemplateView

from pages.models import CONTENT_TYPE_CHOICES, Page


def all_pages(request):
    pages = Page.objects.all()
    data = [page.dictionary for page in pages]
    return HttpResponse(json.dumps(data), content_type='application/json')


def content_types(request):
    data = [{'value': value, 'label': label} for value, label in CONTENT_TYPE_CHOICES]
    return HttpResponse(json.dumps(data), content_type='application/json')


def read_page(request, slug):
    try:
        page = Page.objects.get(slug=slug)
        data = page.dictionary
    except Page.DoesNotExist:
        data = {'title': 'Page Not Found'}
    return HttpResponse(json.dumps(data), content_type='application/json')


@login_required
def save_page(request):
    new_page_dict = json.loads(request.body)

    if 'id' in new_page_dict and new_page_dict['id']:
        try:
            page = Page.objects.get(pk=new_page_dict['id'])
        except Page.DoesNotExist:
            data = {'title': 'Page Not Found'}
    else:
        page = Page.objects.create()

    page.content = new_page_dict['content']
    page.title = new_page_dict['title']
    page.slug = new_page_dict['slug']
    page.parent_id = new_page_dict['parentId']
    page.content_type = new_page_dict['contentType']
    if 'published' in new_page_dict and new_page_dict['published']:
        page.published = datetime.strptime(new_page_dict['published'], '%Y-%m-%d').date()
    else:
        page.published = None
    page.updated = datetime.now()
    page.save()

    data = {}

    return HttpResponse(json.dumps(data), content_type='application/json')


class HomePageView(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super(HomePageView, self).get_context_data(**kwargs)
        context['DEBUG'] = settings.DEBUG
        return context
