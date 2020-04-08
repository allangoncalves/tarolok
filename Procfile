web: gunicorn tarolok.wsgi --chdir backend --limit-request-line 8188 --log-file -
worker: celery worker --workdir backend --app=tarolok --loglevel=info
