from rest_framework import serializers
from api.models import Watcher, Repository, Commit


class WatcherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Watcher
        exclude = ("owner",)


class CommitSerializer(serializers.ModelSerializer):

    class Meta:
        model = Commit
        exclude = ('repo',)


class RepositorySerializer(serializers.ModelSerializer):
    commits = CommitSerializer(read_only=True, many=True)

    class Meta:
        model = Repository
        fields = "__all__"
