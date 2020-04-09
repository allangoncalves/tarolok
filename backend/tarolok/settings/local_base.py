from .base import *  # noqa


DEBUG = True

HOST = "http://localhost:8000"

ALLOWED_HOSTS = ['2182acc6.ngrok.io']

SECRET_KEY = "secret"

DATABASES = {
    "default": {"ENGINE": "django.db.backends.sqlite3", "NAME": base_dir_join("db.sqlite3"), }
}

STATIC_ROOT = base_dir_join("staticfiles")
STATIC_URL = "/static/"

MEDIA_ROOT = base_dir_join("mediafiles")
MEDIA_URL = "/media/"

DEFAULT_FILE_STORAGE = "django.core.files.storage.FileSystemStorage"
STATICFILES_STORAGE = "django.contrib.staticfiles.storage.StaticFilesStorage"

AUTH_PASSWORD_VALIDATORS = []  # allow easy passwords only on local

GITHUB_CLIENT_ID = '910d95794f82052d8662'
GITHUB_CLIENT_SECRET = '972454f7ae7f46fc5af960a5ff5c266b370bb2bd'
GITHUB_REDIRECT_URI = 'https://2182acc6.ngrok.io/github_callback'
GITHUB_SCOPES = "user, repo"
GITHUB_ACCEPT_TYPE = 'application/json'

# Celery
CELERY_TASK_ALWAYS_EAGER = True
CELERY_TASK_EAGER_PROPAGATES = True

# Email
INSTALLED_APPS += ("naomi",)
EMAIL_BACKEND = "naomi.mail.backends.naomi.NaomiBackend"
EMAIL_FILE_PATH = base_dir_join("tmp_email")

# Logging
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {"standard": {"format": "%(levelname)-8s [%(asctime)s] %(name)s: %(message)s"}, },
    "handlers": {
        "console": {"level": "DEBUG", "class": "logging.StreamHandler", "formatter": "standard", },
    },
    "loggers": {
        "": {"handlers": ["console"], "level": "INFO"},
        "celery": {"handlers": ["console"], "level": "INFO"},
    },
}

JS_REVERSE_JS_MINIFY = False
