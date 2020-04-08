from rest_framework import viewsets
from rest_framework.response import Response
from .models import Profile
from .serializers import ProfileSerializer

# Create your views here.


class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    lookup_field = 'username'

    # def list(self):
    #     pass

    def retrieve(self, request, username):
        profile = Profile.objects.get_by_username(username)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

    def get_queryset(self):
        return Profile.objects.all()
