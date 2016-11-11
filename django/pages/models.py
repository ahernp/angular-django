from __future__ import unicode_literals

from django.db import models

HOMEPAGE = 'homepage'
MARKDOWN = 'markdown'
TABLE = 'table'

CONTENT_TYPE_CHOICES = (
    (HOMEPAGE, 'Homepage'),
    (MARKDOWN, 'Markdown'),
    (TABLE, 'Table'),
)


class Page(models.Model):
    title = models.CharField(max_length=250)
    slug = models.SlugField(max_length=250,
                            unique=True)
    parent = models.ForeignKey('self',
                               null=True)
    updated = models.DateTimeField(verbose_name='Time Updated',
                                   auto_now=True)
    published = models.DateField(verbose_name='Date Published',
                                 null=True,
                                 blank=True,
                                 help_text='dd/mm/yyyy')
    content_type = models.CharField(max_length=10,
                                    choices=CONTENT_TYPE_CHOICES,
                                    default=MARKDOWN)
    content = models.TextField(verbose_name='Page content',
                               blank=True)

    class Meta:
        ordering = ['title']

    def __str__(self):
        return self.title

    def _get_dictionary(self):
        return {'id': self.id,
                'title': self.title,
                'url': '/page/%s' % self.slug,
                'parentName': self.parent.title,
                'updated': self.updated.strftime('%Y-%m-%d %H:%M:%S'),
                'published': self.published.strftime('%Y-%m-%d') if self.published else '',
                'contentType': self.content_type,
                'content': self.content}

    dictionary = property(_get_dictionary)

    def _get_breadcrumb_dictionary(self):
        return {'title': self.title,
                'url': '/page/%s' % self.slug,
                'parentName': self.parent.title,
                'updated': self.updated.strftime('%Y-%m-%d %H:%M:%S')}

    breadcrumb_dictionary = property(_get_breadcrumb_dictionary)
