from rest_framework import permissions, viewsets

from api.serializers.beverages import VineSerializer, BiereSerializer
from cave_backend.models.beverages import Vine, Biere

class VineView(viewsets.ModelViewSet):
    """
    Vine viewset for api
    """
    queryset = Vine.objects.all()
    serializer_class = VineSerializer

class BiereView(viewsets.ModelViewSet):
    """
    Biere viewset for api
    """
    queryset = Biere.objects.all()
    serializer_class = BiereSerializer