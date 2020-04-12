
from django.urls import re_path, include
from django.shortcuts import redirect
from .views import WatcherViewSet, RepositoryViewSet, CommitViewSet
from rest_framework_nested import routers

router = routers.SimpleRouter()
# One Level
router.register(r'watchers', WatcherViewSet, basename='watchers')
watcher_router = routers.NestedSimpleRouter(
    router, r'watchers', lookup='watcher'
)
watcher_router.register(
    r'commits', CommitViewSet, basename='watcher-commits'
)

# Two Levels
repository_router = routers.NestedSimpleRouter(
    router, r'watchers', lookup='watcher')
repository_router.register(
    r'repositories', RepositoryViewSet, basename='watcher-repositories'
)

urlpatterns = [
    re_path(r'^', include(router.urls)),
    re_path(r'^', include(watcher_router.urls)),
    re_path(r'^', include(repository_router.urls)),

]
