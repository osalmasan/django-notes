from rest_framework import serializers

from . import models


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Note
        fields = ['id','title', 'content', 'created_at', 'updated_at']