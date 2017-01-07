from django.contrib.auth import authenticate, login, logout
from django.core.exceptions import PermissionDenied
from django.http import HttpResponse


def check_logged_in(request):
    if not request.user.is_authenticated:
        raise PermissionDenied

    return HttpResponse('')


def do_login(request):
    print(request.POST)
    username = request.POST.get(u'username')
    password = request.POST.get(u'password')

    user = authenticate(username=username, password=password)

    if user is not None:
        login(request, user)
        return HttpResponse('')
    else:
        raise PermissionDenied

def do_logout(request):
    logout(request)
