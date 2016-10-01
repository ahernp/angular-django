from django.contrib import admin
from django.db import models
from django.forms.widgets import TextInput, Textarea

from .models import Page


class PageAdmin(admin.ModelAdmin):
    search_fields = ['title']
    list_display = ['title', 'parent', 'updated']
    list_editable = ['parent']
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ['updated']
    ordering = ['parent', 'title']
    save_on_top = True
    fieldsets = (
        (None, {
            'fields': (('content',),
                       ('title', 'parent',),
                       ('slug',),
                       ('updated', 'published'),
            )
        }),
    )
    formfield_overrides = {
        models.CharField: {'widget': TextInput(attrs={'size': 60})},
        models.TextField: {'widget': Textarea(attrs={'rows': 25, 'cols': 110})},
    }


admin.site.register(Page, PageAdmin)
