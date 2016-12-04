from __future__ import absolute_import

from django.db import models


class Group(models.Model):
    """
    Group of feeds.
    """
    name = models.CharField(max_length=250, unique=True)

    class Meta:
        ordering = ['name']

    def __unicode__(self):
        return self.name

    def num_unread_entries(self):
        return Entry.objects.filter(feed__group=self, read_flag=False).count()


class Feed(models.Model):
    """
    Feed information.
    """
    title = models.CharField(max_length=2000, blank=True, null=True)
    xml_url = models.CharField(max_length=255, unique=True)
    link = models.CharField(max_length=2000, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    published_time = models.DateTimeField(blank=True, null=True)
    last_polled_time = models.DateTimeField(blank=True, null=True)
    group = models.ForeignKey(Group, blank=True, null=True)

    class Meta:
        ordering = ['title']

    def __unicode__(self):
        return self.title or self.xml_url

    def num_unread_entries(self):
        return Entry.objects.filter(feed=self, read_flag=False).count()

    def save(self, *args, **kwargs):
        try:
            Feed.objects.get(xml_url=self.xml_url)
            super(Feed, self).save(*args, **kwargs)
        except Feed.DoesNotExist:
            super(Feed, self).save(*args, **kwargs)
            from feedreader.utils import poll_feed
            poll_feed(self)


class EntryManager(models.Manager):
    def num_unread(self):
        return Entry.objects.filter(read_flag=False).count()


class Entry(models.Model):
    """
    Feed entry information.
    """
    feed = models.ForeignKey(Feed)
    title = models.CharField(max_length=2000, blank=True, null=True)
    link = models.CharField(max_length=2000)
    description = models.TextField(blank=True, null=True)
    published_time = models.DateTimeField(auto_now_add=True)
    read_flag = models.BooleanField(default=False)

    class Meta:
        ordering = ['-published_time']
        verbose_name_plural = 'entries'

    def __unicode__(self):
        return self.title

    objects = models.Manager()
    manager = EntryManager()
