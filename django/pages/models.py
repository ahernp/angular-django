from __future__ import unicode_literals

from django.db import models


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
    content = models.TextField(verbose_name='Page body',
                               help_text='Use Markdown syntax.')

    class Meta:
        ordering = ['title']

    def __str__(self):
        return self.title
