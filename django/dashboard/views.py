from __future__ import absolute_import

import json
import os
from subprocess import Popen, PIPE

from django.conf import settings
from django.http import HttpResponse
from django.utils import timezone


# Shell commands: Name and command
SHELL_COMMANDS = [
    ('hostname', 'hostname'),
    ('gitversion', 'git log -n 1'),
    ('python_packages', 'pip freeze'),
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


def dashboard(request):
    """
    Collect information about the state of the system.
    """
    data = {}

    # Versions
    cwd = settings.BASE_DIR
    for name, shell_command in SHELL_COMMANDS:
        data[name] = run_shell_command(shell_command, cwd)

    npm_packages = json.loads(run_shell_command('npm list --depth=0 --json',
                                                os.path.join(os.path.dirname(cwd), 'angular')))
    data['npm_packages'] = ' '.join(['%s==%s' % (key, value['version'])
                                    for key, value in npm_packages['dependencies'].items()])


    # Settings Flags
    data['settings_flags'] = []
    for name, expected in SETTINGS_FLAGS:
        actual_setting = getattr(settings, name, None)
        data['settings_flags'].append({
            'name': name,
            'expected': expected,
            'actual': actual_setting
        })

    data['timeChecked'] = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
    return HttpResponse(json.dumps(data), content_type='application/json')
