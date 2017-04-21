from __future__ import absolute_import

from django.contrib import admin

from .models import Group, Feed, Entry


class GroupAdmin(admin.ModelAdmin):
    pass

admin.site.register(Group, GroupAdmin)


class FeedAdmin(admin.ModelAdmin):
    list_display = ['xml_url', 'title', 'group', 'published_time', 'last_polled_time']
    list_filter = ['group']
    search_fields = ['link', 'title']
    readonly_fields = ['title', 'link', 'description', 'published_time',
                       'last_polled_time']
    fieldsets = (
        (None, {
            'fields': (('xml_url', 'group',),
                       ('title', 'link',),
                       ('description',),
                       ('published_time', 'last_polled_time',),
                       )
        }),
    )

admin.site.register(Feed, FeedAdmin)


class EntryAdmin(admin.ModelAdmin):
    list_display = ['title', 'feed', 'published_time']
    list_filter = ['read_flag', 'feed']
    search_fields = ['title', 'link']
    readonly_fields = ['link', 'title', 'description', 'published_time', 'feed']
    fieldsets = (
        (None, {
            'fields': (('link',),
                       ('title', 'feed',),
                       ('description',),
                       ('published_time', 'read_flag'),
                       )
        }),
    )

admin.site.register(Entry, EntryAdmin)
