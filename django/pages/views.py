import json

from datetime import datetime

from django.conf import settings
from django.contrib.auth.decorators import login_required
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


@login_required
def save_page(request):
    new_page_dict = json.loads(request.body)
    try:
        old_page = Page.objects.get(pk=new_page_dict['id'])
        old_page.content = new_page_dict['content']
        old_page.title = new_page_dict['title']
        old_page.slug = new_page_dict['slug']
        old_page.parent_id = new_page_dict['parentId']
        old_page.updated = datetime.now()
        old_page.save()
        data = {}
    except Page.DoesNotExist:
        data = {'title': 'Page Not Found'}
    return HttpResponse(json.dumps(data), content_type='application/json')


class HomePageView(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super(HomePageView, self).get_context_data(**kwargs)
        context['DEBUG'] = settings.DEBUG
        return context
