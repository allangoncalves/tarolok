from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from model_utils.fields import AutoCreatedField, AutoLastModifiedField
from django.utils.translation import ugettext_lazy as _
from django.db import models
from .managers import UserManager


class GithubOauthUser(AbstractBaseUser):
    token = models.CharField(max_length=100, primary_key=True)
    objects = UserManager()

    USERNAME_FIELD = "token"

    def __str__(self):
        return self.token
