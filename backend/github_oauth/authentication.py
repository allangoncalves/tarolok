import requests
from django.contrib.auth.backends import RemoteUserBackend

from .conf import conf
from .links import ACCESS_TOKEN_URL, PROFILE_DATA_URL
from users.models import GithubOauthUser
from api.models import Watcher
# from api.models import Profile


class GithubOAuthentication(RemoteUserBackend):

    def authenticate(self, request, **kwargs):
        code = kwargs.get("code", "")
        payload = {'code': code, 'client_id': conf.CLIENT_ID, 'client_secret': conf.CLIENT_SECRET,
                   'redirect_uri': conf.REDIRECT_URI}
        headers = {'Accept': conf.ACCEPT_TYPE}
        response = requests.post(
            ACCESS_TOKEN_URL, params=payload, headers=headers)
        if response.ok:
            json = response.json()
            access_token = json['access_token']
            response = requests.get(PROFILE_DATA_URL, headers={
                                    'Authorization': f'token {access_token}'})
            if response.ok:
                json = response.json()
                user, created = GithubOauthUser.objects.update_or_create(
                    login=json['login'], defaults={'token': access_token})
                if created:
                    Watcher.objects.create(username=json['login'], owner=user)
                return user
        return None

    def get_user(self, login):
        try:
            return GithubOauthUser.objects.get(pk=login)
        except GithubOauthUser.DoesNotExist:
            return None
