"""Fabfile for ahernp.com project."""
import codecs
from datetime import datetime
from os.path import abspath, dirname, join

from decorator import decorator

from fabric.api import (env, local, lcd, cd, run,
                        task, hosts, settings, abort,
                        prefix)
from fabric.colors import magenta
from fabric.contrib.console import confirm
from fabric.operations import get

DJANGO_ROOT = dirname(abspath(__file__))
SITE_ROOT = dirname(DJANGO_ROOT)
LIVE_SITE_ROOT = '~/code/django-ahernp/ahernp'
DATABASE_NAME = 'ad'

env.hosts = ['web']


def write_file(filename, data):
    """Write data to file."""
    output_file = codecs.open(filename, 'w', 'utf-8')
    output_file.write(data)
    output_file.close()


@decorator
def timer(func, *args, **kwargs):
    """Wrapper which outputs how long a function took to run."""
    start_time = datetime.now()
    result = func(*args, **kwargs)
    end_time = datetime.now()
    duration = end_time - start_time
    print(magenta('# {} ran for {} (started at {:%H:%M:%S}, ended at {:%H:%M:%S})'
                  .format(func.__name__, duration, start_time, end_time)))
    return result


@task
@timer
def setup(*args, **kwargs):
    """Setup development environment in current virtualenv."""
    if args and args[0] == 'init':
        pass  # Rebuild development environment
    else:
        with lcd(DJANGO_ROOT):
            local("git pull")

    with lcd(SITE_ROOT):
        local('pip install -r requirements/local.txt')

    # Get current data from live
    if confirm('Get data from live system?'):
        with cd(LIVE_SITE_ROOT):
            run('~/.virtualenvs/ahernp/bin/python manage.py dumpdata --settings=ahernp.settings.production '
                '--indent 4 dmcm sites.site feedreader.group feedreader.feed > ~/live_snapshot.json')
        get('live_snapshot.json', join(DJANGO_ROOT, 'ahernp', 'fixtures', 'live_snapshot.json'))

    # Reload database
    local('dropdb %s' % (DATABASE_NAME))
    local('createdb %s' % (DATABASE_NAME))

    manage('migrate --settings=ahernp.settings.local')
    manage('loaddata ahernp/fixtures/live_snapshot.json --settings=ahernp.settings.local')
    manage('loaddata ahernp/fixtures/auth.json --settings=ahernp.settings.local')
    manage('collectstatic --noinput --settings=ahernp.settings.local')


@task
@hosts('localhost')
@timer
def test():
    """Run Django Unit Tests."""
    with settings(warn_only=True), lcd(DJANGO_ROOT):
        result = local('python manage.py test --settings=ahernp.settings.test')
    return result


@task
@hosts('localhost')
@timer
def runserver():
    """Run Django runserver."""
    with settings(warn_only=True), lcd(DJANGO_ROOT):
        local('python manage.py runsslserver --settings=ahernp.settings.local')


@task
@timer
def deliver():
    """Test, commit and push changes. """
    local("git status")
    with lcd(DJANGO_ROOT):
        local('grep -r --include="*.py" "pdb" . || [ $? -lt 2 ]')
        # grep issues a return code of 1 if no matches were found
        # '|| [ $? -lt 2 ]' ensures a zero return code to local
        if not confirm('Check status. Continue with delivery?'):
            abort('Aborting at user request.')

        with settings(warn_only=True):
            result = local('python manage.py test --settings=ahernp.settings.local')
        if result.failed and not confirm("Tests failed. Continue anyway?"):
            abort("Aborting at user request.")

        local("git add -p && git commit")
        local("git push")


@task
@timer
def deploy():
    """Deploy django-ahernp into virtualenv on live server."""
    with settings(warn_only=True):
        if run("test -d %s" % LIVE_SITE_ROOT).failed:
            run("git clone git@github.com:ahernp/DMCM.git %s" % LIVE_SITE_ROOT)
        else:
            with cd(LIVE_SITE_ROOT):
                run("git pull")

    with cd(LIVE_SITE_ROOT):
        run('~/.virtualenvs/ahernp/bin/pip install -r ../requirements/production.txt')
        run('~/.virtualenvs/ahernp/bin/python manage.py collectstatic --noinput --settings=ahernp.settings.production')
        run('touch ahernp/uwsgi.ini')


@task
@hosts('localhost')
@timer
def manage(*args, **kwargs):
    """Locally execute Django command."""
    with settings(warn_only=True):
        with lcd(DJANGO_ROOT):
            local('python manage.py %s %s' % (' '.join(args),
                                              ' '.join(['%s=%s' % (option, kwargs[option]) for option in kwargs])))
