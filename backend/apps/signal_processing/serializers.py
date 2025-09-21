from rest_framework import serializers
from .models import SignalSample

class SignalSampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = SignalSample
        fields = ('id', 'device_id', 'timestamp', 'value', 'meta')