from __future__ import absolute_import

import json
import os
from subprocess import Popen, PIPE

from django.conf import settings
from django.http import HttpResponse
from django.utils import timezone


# Shell commands: Name and command
from core.models import Log

SHELL_COMMANDS = [
    ('hostname', 'hostname'),
    ('gitVersion', 'git log -n 1'),
    ('pythonPackages', 'pip freeze'),
]

# Flags in settings: Their expected values.
SETTINGS_FLAGS = [
    ('DEBUG', False),
]


def run_shell_command(command, cwd):
    """
    Run command in shell and return results.
    """
    p = Popen(command, shell=True, cwd=cwd, stdout=PIPE)
    stdout = p.communicate()[0]
    if stdout:
        stdout = stdout.strip()
    return stdout


def project_state_at_startup():
    """
    Collect information about the state of the system.
    """
    data = {}

    # Versions
    cwd = settings.BASE_DIR
    for name, shell_command in SHELL_COMMANDS:
        data[name] = run_shell_command(shell_command, cwd)

    with open(os.path.join(settings.BASE_DIR, '../angular/package.json')) as f:
        package = json.loads(f.read())
    data['npmPackages'] = ' '.join(['%s==%s' % (key, value)
                                    for key, value in package['dependencies'].items()])

    # Settings Flags
    data['settingsFlags'] = []
    for name, expected in SETTINGS_FLAGS:
        actual_setting = getattr(settings, name, None)
        data['settingsFlags'].append({
            'name': name,
            'expected': expected,
            'actual': actual_setting
        })
    return data

PROJECT_STATE = project_state_at_startup()


def dashboard(request):
    """
    Collect information about the state of the system.
    """
    data = PROJECT_STATE

    entries = Log.objects.all().order_by('-datetime')[:settings.LOG_ENTRIES_TO_SHOW]

    data['logEntries'] = [{'level': entry.level,
                           'msg': entry.msg,
                           'datetime': entry.datetime.strftime('%Y-%m-%d %H:%M:%S')}
                          for entry in entries]

    data['timeChecked'] = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
    return HttpResponse(json.dumps(data), content_type='application/json')
