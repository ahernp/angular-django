"""
This command deletes older Log entries
"""
from __future__ import absolute_import

from datetime import timedelta

from django.core.management.base import BaseCommand
from django.utils import timezone

from ...models import Log

import logging

logger = logging.getLogger('core')

DEFAULT_TIMEDELTA_DAYS = 30  # Keep Log entries for 30 days


class Command(BaseCommand):
    help = 'Deletes older Log entries.'

    def add_arguments(self, parser):
        """
        Add named (optional) arguments
        """
        parser.add_argument('keep_delta', nargs='?', default=DEFAULT_TIMEDELTA_DAYS, type=int)
        parser.add_argument('--verbose',
                            action='store_true',
                            dest='verbose',
                            default=False,
                            help='Print progress on command line')

    def handle(self, *args, **options):
        """
        Delete older Log entries.
        """
        verbose = options['verbose']

        keep_delta = options['keep_delta']

        delete_before = timezone.now() - timedelta(days=keep_delta)

        if verbose:
            log_count = Log.objects.filter(datetime__lt=delete_before).count()
            print('%d Log entries to delete (older than %s)' % (log_count, delete_before))

        Log.objects.filter(datetime__lt=delete_before).delete()

        if verbose:
            logger.info('Log entries deleted successfully')
