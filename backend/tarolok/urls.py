from django.conf.urls import include
from django.urls import path
from django.contrib import admin
from django.shortcuts import redirect

import django_js_reverse.views


urlpatterns = [
    path("admin/", admin.site.urls, name="admin"),
    path("", include("exampleapp.urls"), name="exampleapp"),
    path("v1/api/", include(("api.urls", "api"), namespace="v1")),
]
