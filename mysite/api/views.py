from rest_framework import permissions, viewsets

from api.serializers.beverages import VineSerializer, BiereSerializer
from cave_backend.models.beverages import Vine, Biere

class VineView(viewsets.ModelViewSet):
    """
    Vine viewset for api
    """
    serializer_class = VineSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        
        queryset = Vine.objects.all()
        username = self.request.query_params.get('mvp')
        if username is not None:
            queryset = queryset.filter(selection=True)
        return queryset

class BiereView(viewsets.ModelViewSet):
    """
    Biere viewset for api
    """
    queryset = Biere.objects.all()
    serializer_class = BiereSerializer