from django.contrib.auth import authenticate, login
from django.shortcuts import redirect
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse


@csrf_exempt
def github_hooks(request):
    print(request)
    print(request.body)
    return HttpResponse("pong")


def github_callback(request):
    code = request.GET.get('code')
    user = authenticate(code=code)
    if user is not None:
        login(request, user)
        return redirect("/")
    return redirect("/login")
