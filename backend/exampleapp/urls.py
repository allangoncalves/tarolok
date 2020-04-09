from django.urls import path
from . import views

app_name = 'exampleapp'
urlpatterns = [
    path('monitor', views.IndexView.as_view(), name='index'),
    path('hello', views.hello, name='hello'),
    path('test', views.test, name='test'),
    path('github_hooks', views.github_hooks, name='github_hooks'),
    path('github_callback', views.github_callback, name='github_callback'),
]
