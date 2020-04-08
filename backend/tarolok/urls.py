from django.conf.urls import include
from django.urls import path
from django.contrib import admin
from django.shortcuts import redirect

import django_js_reverse.views


urlpatterns = [
    path("", lambda request : redirect("/exampleapp/")),
    path("admin/", admin.site.urls, name="admin"),
    path("jsreverse/", django_js_reverse.views.urls_js, name="js_reverse"),
    path("exampleapp/", include("exampleapp.urls"), name="exampleapp"),
    path("v1/api/", include("api.urls"), name="v1"),
]
