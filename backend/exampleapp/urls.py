from django.urls import path, re_path
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect
from . import views

app_name = 'exampleapp'

urlpatterns = [
    path('login', views.IndexView.as_view(), name="login"),
    re_path(r'.*', login_required(views.IndexView.as_view(),
                                  login_url="/login"), name="redirect"),
]
