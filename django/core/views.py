from django.core.exceptions import PermissionDenied
from django.http import HttpResponse


def check_logged_in(request):
    if not request.user.is_authenticated:
        raise PermissionDenied

    return HttpResponse('')
