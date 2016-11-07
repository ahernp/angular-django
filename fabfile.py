"""Fabfile for ahernp.com project."""
import codecs
from datetime import datetime
from os.path import abspath, dirname, join

from decorator import decorator

from fabric.api import (env, local, lcd,
                        task, hosts, settings)
from fabric.colors import magenta
from fabric.contrib.files import append, exists

SITE_ROOT = dirname(abspath(__file__))
LIVE_SITE_ROOT = '~/code/django-ahernp/ahernp'
DJANGO_ROOT = join(SITE_ROOT, 'django')
ANGULAR_ROOT = join(SITE_ROOT, 'angular')
PROJECT_NAME = 'ad'
DATABASE_NAME = 'dmcm'
BUNDLE_NAME = 'ad.bundle.js'
STYLES_NAME = 'styles.css'

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
@hosts('localhost')
@timer
def setup(*args, **kwargs):
    """Setup development environment in current virtualenv."""
    if args and args[0] == 'init':
        with settings(warn_only=True):
            with lcd(DJANGO_ROOT):
                local('rm media')
            with lcd(ANGULAR_ROOT):
                local('rm -rf dist')
                local('rm -rf node_modules')
                local('rm -rf typings')
            with lcd(join(DJANGO_ROOT, 'site_assets')):
                local('rm %s' % BUNDLE_NAME)
                local('rm %s' % STYLES_NAME)

    with lcd(DJANGO_ROOT):
        local("git pull")

    # Install Python packages
    with lcd(SITE_ROOT):
        local('pip install -r requirements/local.txt')

    # Setup Angular
    with lcd(ANGULAR_ROOT):
        local('npm install')
        local('npm run build')

    # Link to Angular resources
    with settings(warn_only=True):
        with lcd(join(DJANGO_ROOT, 'site_assets')):
            local('ln -s ../../angular/dist/{bundle} {bundle}'.format(bundle=BUNDLE_NAME))
            local('ln -s ../../angular/src/{styles} {styles}'.format(styles=STYLES_NAME))

    # Link to media
    with settings(warn_only=True):
        with lcd(join(DJANGO_ROOT)):
            if not exists('media'):
                local('ln -s ~/Documents/ahernp.com/site/ media')

    # Reset database
    if args and args[0] == 'init':
        local('dropdb %s' % (DATABASE_NAME))
        local('createdb %s' % (DATABASE_NAME))

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
def start():
    """Run local Angular server."""
    with settings(warn_only=True), lcd(ANGULAR_ROOT):
        local('npm start')


@task
@timer
def deploy():
    """Deploy project into virtualenv on live server."""
    with lcd(ANGULAR_ROOT):
        local('npm run build:prod')
    with settings(warn_only=True):
        if run("test -d %s" % LIVE_SITE_ROOT).failed:
            run("git clone git@github.com:ahernp/angular-django.git %s" % LIVE_SITE_ROOT)
        else:
            with cd(LIVE_SITE_ROOT):
                run("git pull")

    with cd(LIVE_SITE_ROOT):
        run('~/.virtualenvs/ahernp/bin/pip install -r ../requirements/production.txt')
        run('~/.virtualenvs/ahernp/bin/python manage.py collectstatic --noinput')
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
