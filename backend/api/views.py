from rest_framework import viewsets
from rest_framework.response import Response
import datetime

from .models import Watcher, Repository, Commit
from .serializers import WatcherSerializer, RepositorySerializer, CommitSerializer

from django.db import transaction

import requests


COMMITS_URL = 'https://api.github.com/repos/{username}/{repository}/commits?per_page=100&since={since}'

# Create your views here.


# @transaction.atomic
# def create_commits(commits, repository):
#     for commit in commits:
#         valid_data = {
#             'sha': commit['sha'],
#             'message': commit['commit']['message'],
#             'repo': repository
#         }
#         commit = Commit.objects.create(**valid_data)
#         commit.save()

def create_bulk(commits, repository):
    Commit.objects.bulk_create(
        [Commit(sha=commit['sha'],
                message=commit['commit']['message'],
                repo=repository, date=datetime.datetime.strptime(
                    commit['commit']['author']['date'], "%Y-%m-%dT%H:%M:%SZ").date()
                )
            for commit in commits]
    )


class CommitViewSet(viewsets.ModelViewSet):
    serializer_class = CommitSerializer

    def get_queryset(self):
        return Commit.objects.select_related('repo').filter(repo__watcher=self.kwargs['watcher_pk'])


class WatcherViewSet(viewsets.ModelViewSet):
    serializer_class = WatcherSerializer
    queryset = Watcher.objects.all()


class RepositoryViewSet(viewsets.ModelViewSet):
    serializer_class = RepositorySerializer

    def create(self, request, watcher_pk=None, **kwargs):
        full_name = request.data['full_name']
        watcher = Watcher.objects.get(username=watcher_pk)
        repository, created = Repository.objects.get_or_create(
            full_name=full_name)
        if created:
            username, repo_name = full_name.split('@')
            response = requests.get(
                COMMITS_URL.format(
                    username=username,
                    repository=repo_name,
                    since=(
                        datetime.date.today() - datetime.timedelta(days=30)
                    ).isoformat()
                )
            )
            if response.ok:
                create_bulk(response.json(), repository)
                while 'next' in response.links.keys():
                    response = requests.get(response.links['next']['url'])
                    if response.ok:
                        create_bulk(response.json(), repository)
                    else:
                        break
        watcher.repositories.add(repository)
        serializer = RepositorySerializer(repository)
        return Response(serializer.data)

    def get_queryset(self):
        return Repository.objects.filter(watcher=self.kwargs['watcher_pk'])
