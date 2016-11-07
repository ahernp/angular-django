#!/bin/bash
# Check if processes are running, if not start them
if ! pgrep -u ahernp nginx > /dev/null
then
    /home/ahernp/local/sbin/nginx &
fi
if ! pgrep -u ahernp uwsgi > /dev/null
then
    source /home/ahernp/.virtualenvs/ahernp/bin/activate && /home/ahernp/.virtualenvs/ahernp/bin/uwsgi --ini /home/ahernp/code/angular-django/django/ad/uwsgi.ini &
fi
