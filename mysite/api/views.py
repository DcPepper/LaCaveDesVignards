from rest_framework import permissions, viewsets

from api.serializers.beverages import VineSerializer, BiereSerializer
from cave_backend.models.beverages import Vine, Biere
import meilisearch
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

client = meilisearch.Client('http://127.0.0.1:7700')

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

@api_view(['GET'])
def search_wine(request):
    """
    Meilisearch for wine
    """
    index = client.index('wines')

    if request.method == "GET":
        documents = Vine.objects.all()
        index.add_documents([VineSerializer(q).data for q in documents])
        q = request.GET.get("q") 
            
        search = index.search(q)
        return Response(search, status=status.HTTP_200_OK)
        