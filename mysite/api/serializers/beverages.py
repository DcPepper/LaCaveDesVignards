from rest_framework import serializers

from cave_backend.models.beverages import Vine, Biere


class VineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vine
        fields = "__all__"
        
class BiereSerializer(serializers.ModelSerializer):
    class Meta:
        model = Biere
        fields = "__all__"