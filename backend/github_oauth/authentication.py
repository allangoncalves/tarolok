import requests
from django.contrib.auth.backends import RemoteUserBackend

from .conf import conf
from .links import ACCESS_TOKEN_URL
from .models import GithubOauthUser


class GithubOAuthentication(RemoteUserBackend):

    def authenticate(self, request, **kwargs):
        code = kwargs.get("code", "")
        print(code)
        payload = {'code': code, 'client_id': conf.CLIENT_ID, 'client_secret': conf.CLIENT_SECRET,
                   'redirect_uri': conf.REDIRECT_URI}
        headers = {'Accept': conf.ACCEPT_TYPE}
        response = requests.post(
            ACCESS_TOKEN_URL, params=payload, headers=headers)
        if response.ok:
            json = response.json()
            print(json)
            access_token = json['access_token']
            user, created = GithubOauthUser.objects.get_or_create(
                token=access_token)
            return user if created else None
        else:
            return None

    def get_user(self, token):
        try:
            return GithubOauthUser.objects.get(pk=token)
        except Exception:
            return None
