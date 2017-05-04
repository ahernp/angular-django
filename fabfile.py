"""Fabfile for angular-django project."""
from datetime import datetime
from os.path import abspath, dirname, join

from decorator import decorator

from fabric.api import cd, env, get, hosts, lcd, local, run, settings, task
from fabric.colors import magenta
from fabric.contrib.console import confirm
from fabric.contrib.files import exists

SITE_ROOT = dirname(abspath(__file__))
LIVE_SITE_ROOT = '~/code/angular-django/django'
DJANGO_ROOT = join(SITE_ROOT, 'django')
ANGULAR_ROOT = join(SITE_ROOT, 'angular')
PROJECT_NAME = 'ad'
DATABASE_NAME = 'dmcm'
BUNDLE_NAME = 'ad.bundle.js'
VENDOR_BUNDLE_NAME = 'vendor.bundle.js'
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
@timer
def get_live_data():
    """ Download snapshot of live data """
    with settings(host_string='web'):
        with cd(LIVE_SITE_ROOT):
            run('~/.virtualenvs/ahernp2/bin/python manage.py dumpdata '
                '--indent 4 pages feedreader.group feedreader.feed > ~/live_snapshot.json')
        get('live_snapshot.json', join(DJANGO_ROOT, 'ad', 'fixtures', 'live_snapshot.json'))


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
                local('rm %s' % VENDOR_BUNDLE_NAME)
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
            local('ln -s ../../angular/dist/{0} {0}'.format(BUNDLE_NAME))
            local('ln -s ../../angular/dist/{0} {0}'.format(VENDOR_BUNDLE_NAME))
            local('ln -s ../../angular/src/{0} {0}'.format(STYLES_NAME))

    # Link to media
    with settings(warn_only=True):
        with lcd(join(DJANGO_ROOT)):
            if not exists('media'):
                local('ln -s ~/Documents/ahernp.com/site/ media')

    # Reset database
    if args and args[0] == 'init':
        local('dropdb %s' % (DATABASE_NAME))
        local('createdb %s' % (DATABASE_NAME))

    if confirm('Get data from live system?'):
        get_live_data()

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
        local('python manage.py runserver --settings=ad.settings_local')


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
            run('git clone https://github.com/ahernp/angular-django.git ~/code/angular-django')
        else:
            with cd(LIVE_SITE_ROOT):
                run("git pull")

    with lcd(ANGULAR_ROOT):
        local('scp dist/{bundle} web:{site_root}/site_assets/{bundle}'.format(
            bundle=BUNDLE_NAME,
            site_root=LIVE_SITE_ROOT))
        local('scp src/{styles} web:{site_root}/site_assets/{styles}'.format(
            styles=STYLES_NAME,
            site_root=LIVE_SITE_ROOT))
        if confirm('Copy vendor bundle to live system?'):
            local('scp dist/{bundle} web:{site_root}/site_assets/{bundle}'.format(
                bundle=VENDOR_BUNDLE_NAME,
                site_root=LIVE_SITE_ROOT))

    with cd(LIVE_SITE_ROOT):
        run('~/.virtualenvs/ahernp2/bin/pip install -r ../requirements/production.txt')
        run('~/.virtualenvs/ahernp2/bin/python manage.py collectstatic --noinput')
        run('~/.virtualenvs/ahernp2/bin/python manage.py migrate --noinput')
        run('touch ad/uwsgi.ini')


@task
@hosts('localhost')
@timer
def manage(*args, **kwargs):
    """Locally execute Django command."""
    with settings(warn_only=True):
        with lcd(DJANGO_ROOT):
            local('python manage.py %s %s' % (' '.join(args),
                                              ' '.join(['%s=%s' % (option, kwargs[option])
                                                        for option in kwargs])))
