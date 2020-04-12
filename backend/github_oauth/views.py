from django.contrib.auth import authenticate, login
from django.shortcuts import redirect
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from api.models import Commit, Repository
import datetime
import json


@csrf_exempt
def github_hooks(request):
    response = json.loads(request.body)
    try:
        commits = response['commits']
    except KeyError:
        return HttpResponse("pong")
    repo = Repository.objects.get(
        full_name=response['repository']['full_name'].replace('/', '@'))

    Commit.objects.bulk_create(
        [Commit(
            sha=commit['id'],
            message=commit['message'],
            date=datetime.datetime.strptime(
                commit['timestamp'],
                "%Y-%m-%dT%H:%M:%S%z").date(),
            repo=repo) for commit in commits]
    )
    return HttpResponse("pong")


@csrf_exempt
def github_callback(request):
    code = request.GET.get('code')
    user = authenticate(code=code)
    if user is not None:
        login(request, user)
        return redirect("/")
    return redirect("/login")
