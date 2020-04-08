from django.db import models
import requests

# Create your models here.


class ProfileQuerySet(models.query.QuerySet):
    def get_by_username(self, username):
        qs = self.filter(username=username)
        if qs.count() == 1:
            return qs.first()
        response = requests.get(
            f'https://api.github.com/users/{username}',
            headers={'Accept': 'application/json'}
        )
        if response.ok:
            profile_data = response.json()
            profile = self.create(
                username=profile_data['login'],
                name=profile_data['name'],
                repos_url=profile_data['repos_url'],
                html_url=profile_data['html_url']
            )
            profile.save()
            return profile


class RepositoryQuerySet(models.query.QuerySet):
    def get_or_create(self, name, owner):
        qs = self.filter(name, owner)
        if qs.count() == 1:
            return qs.first()
        repo = self.create(repo_name=name, owner=owner)
        repo.save()
        return repo


class Profile(models.Model):
    username = models.CharField(max_length=255, primary_key=True)
    name = models.URLField(max_length=255, blank=False, null=False)
    repos_url = models.URLField(max_length=255, blank=False, null=False)
    html_url = models.URLField(max_length=255, blank=False, null=False)

    objects = ProfileQuerySet.as_manager()

    def __str__(self):
        return self.username


class Repository(models.Model):
    owner = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        related_name="repositories"
    )
    repo_name = models.CharField(max_length=255, primary_key=True)


# class Commit(models.Model):
#     sha = models.CharField(max_length=255)
