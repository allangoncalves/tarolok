
from django.urls import path
from django.shortcuts import redirect
from .views import ProfileViewSet

from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'profiles', ProfileViewSet, basename="profile")


urlpatterns = [
    # path("", lambda request : redirect("/exampleapp/")),
]

urlpatterns += router.urls