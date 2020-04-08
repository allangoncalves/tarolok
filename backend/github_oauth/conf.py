from django.conf import settings
from django.core.exceptions import ImproperlyConfigured


class Config(object):

    def __init__(self, **kwargs):
        self.CLIENT_ID = kwargs.get("CLIENT_ID", "")
        self.CLIENT_SECRET = kwargs.get("CLIENT_SECRET", "")
        self.REDIRECT_URI = kwargs.get("REDIRECT_URI", "")
        self.ACCEPT_TYPE = kwargs.get("ACCEPT_TYPE", "")
        self.SCOPES = kwargs.get("SCOPES", "")
        self.defaults = kwargs

    def __getattr_(self, name):
        try:
            return getattr(settings, name)
        except AttributeError:
            if name not in self.defaults:
                raise ImproperlyConfigured(
                    '[Django-Github-OAuth] Missing setting {0}'.format(name))


conf = Config(
    CLIENT_ID=settings.GITHUB_CLIENT_ID,
    CLIENT_SECRET=settings.GITHUB_CLIENT_SECRET,
    REDIRECT_URI=settings.GITHUB_REDIRECT_URI,
    SCOPES=settings.GITHUB_SCOPES,
    ACCEPT_TYPE=settings.GITHUB_ACCEPT_TYPE,
)
