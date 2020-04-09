from django.db import models
import requests

from users.models import GithubOauthUser

# Create your models here.


class Repository(models.Model):
    full_name = models.CharField(max_length=255, primary_key=True)

    def __str__(self):
        return self.full_name


class Watcher(models.Model):
    owner = models.ForeignKey(GithubOauthUser, on_delete=models.CASCADE)
    username = models.CharField(max_length=255, primary_key=True)
    repositories = models.ManyToManyField(Repository)

    def __str__(self):
        return self.username


class Commit(models.Model):
    sha = models.CharField(max_length=255, primary_key=True)
    message = models.CharField(max_length=255, blank=True, null=False)
    date = models.DateField()
    repo = models.ForeignKey(
        Repository, on_delete=models.CASCADE, related_name='commits')

    def __str__(self):
        return self.sha

    class Meta:
        ordering = ['-date']
