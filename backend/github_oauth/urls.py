

from django.urls import path
from . import views

urlpatterns = [
    path('hooks', views.github_hooks, name='github_hooks'),
    path('callback', views.github_callback, name='github_callback'),
]
