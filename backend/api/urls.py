
from django.urls import re_path, include
from django.shortcuts import redirect
from .views import WatcherViewSet, RepositoryViewSet, CommitViewSet
from rest_framework_nested import routers

router = routers.SimpleRouter()
router.register(r'watchers', WatcherViewSet, basename='watchers')

commit_router = routers.NestedSimpleRouter(
    router, r'watchers', lookup='watcher'
)
commit_router.register(
    r'commits', CommitViewSet, basename='watcher-commits'
)

repository_router = routers.NestedSimpleRouter(
    router, r'watchers', lookup='watcher')
repository_router.register(
    r'repositories', RepositoryViewSet, basename='watcher-repositories'
)

urlpatterns = [
    re_path(r'^', include(router.urls)),
    re_path(r'^', include(repository_router.urls)),
    re_path(r'^', include(commit_router.urls)),
]
