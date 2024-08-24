from rest_framework import serializers
from .models import Betail

class BetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Betail
        fields = '__all__'