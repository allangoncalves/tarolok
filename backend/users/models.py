from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils.translation import ugettext_lazy as _

from common.models import IndexedTimeStampedModel

from .managers import UserManager, GithubUserManager


# class User(AbstractBaseUser, PermissionsMixin, IndexedTimeStampedModel):
#     email = models.EmailField(max_length=255, unique=True)
#     is_staff = models.BooleanField(
#         default=False, help_text=_("Designates whether the user can log into this admin " "site.")
#     )
#     is_active = models.BooleanField(
#         default=True,
#         help_text=_(
#             "Designates whether this user should be treated as "
#             "active. Unselect this instead of deleting accounts."
#         ),
#     )

#     objects = UserManager()

#     USERNAME_FIELD = "email"

#     def get_full_name(self):
#         return self.email

#     def get_short_name(self):
#         return self.email

#     def __str__(self):
#         return self.email


class GithubOauthUser(AbstractBaseUser, PermissionsMixin, IndexedTimeStampedModel):
    login = models.CharField(max_length=100, primary_key=True)
    token = models.CharField(max_length=100, null=False, blank=False)

    is_staff = models.BooleanField(
        default=False, help_text=_("Designates whether the user can log into this admin " "site.")
    )
    is_active = models.BooleanField(
        default=True,
        help_text=_(
            "Designates whether this user should be treated as "
            "active. Unselect this instead of deleting accounts."
        ),
    )

    objects = GithubUserManager()

    USERNAME_FIELD = "login"

    def __str__(self):
        return self.login

    def get_login(self):
        return self.login
