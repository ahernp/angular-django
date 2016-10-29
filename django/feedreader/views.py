from __future__ import absolute_import

from django.views.generic import ListView

from feedreader.models import Entry


class EntryList(ListView):
    """List of Entries"""
    model = Entry
    extra_context = {}

    def dispatch(self, request, *args, **kwargs):
        self.extra_context = build_context(request)
        self.queryset = self.extra_context['entry_list']
        return super(EntryList, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super(EntryList, self).get_context_data(**kwargs)
        self.extra_context.update(context)
        return self.extra_context
