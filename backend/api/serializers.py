from rest_framework import serializers
from api.models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"


# class RepositorySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Repository
#         fields = "__all__"


# class MessageSerializer(serializers.Serializer):
#     message = serializers.CharField(max_length=255)


# class CommitSerializer(serializers.ModelSerializer):
#     commit = MessageSerializer(source="*")
#     author = ProfileSerializer()

#     class Meta:
#         model = Commit
#         fields = "__all__"
