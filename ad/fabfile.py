"""Fabfile for ahernp.com project."""
import codecs
from datetime import datetime
from os.path import abspath, dirname, join

from decorator import decorator

from fabric.api import (env, local, lcd,
                        task, hosts, settings)
from fabric.colors import magenta
from fabric.contrib.files import exists

DJANGO_ROOT = dirname(abspath(__file__))
SITE_ROOT = dirname(DJANGO_ROOT)
PROJECT_NAME = 'ad'

env.hosts = ['web']


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
        with lcd(DJANGO_ROOT):
            local('rm -rf static')
            local('rm db.sqlite3')

    with lcd(DJANGO_ROOT):
        local("git pull")

    # Install packages
    with lcd(SITE_ROOT):
        local('pip install -r requirements/local.txt')

    # Build Angular 2 frontend
    with settings(warn_only=True):
        with lcd(join(DJANGO_ROOT, 'site_assets')):
            local('rm node_modules')

    with lcd(DJANGO_ROOT):
        local('npm install')
        local('npm run tsc')

    with lcd(join(DJANGO_ROOT, 'site_assets')):
        local('ln -s ../node_modules node_modules')

    # Reset database
    manage('migrate')
    manage('loaddata %s/fixtures/live_snapshot.json' % PROJECT_NAME)
    manage('loaddata %s/fixtures/auth.json' % PROJECT_NAME)


@task
@hosts('localhost')
@timer
def test():
    """Run Django Unit Tests."""
    with settings(warn_only=True), lcd(DJANGO_ROOT):
        result = local('python manage.py test')
    return result


@task
@hosts('localhost')
@timer
def runserver():
    """Run Django runserver."""
    with settings(warn_only=True), lcd(DJANGO_ROOT):
        local('python manage.py runserver')


@task
@hosts('localhost')
@timer
def manage(*args, **kwargs):
    """Locally execute Django command."""
    with settings(warn_only=True):
        with lcd(DJANGO_ROOT):
            local('python manage.py %s %s' % (' '.join(args),
                                              ' '.join(['%s=%s' % (option, kwargs[option]) for option in kwargs])))
