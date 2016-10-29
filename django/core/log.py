from __future__ import absolute_import

import logging


class DbLogHandler(logging.Handler):
    def emit(self, record):
        from .models import Log
        Log(level=record.levelname, msg=record.msg).save()
