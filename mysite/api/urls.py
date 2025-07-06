from django.urls import include, path
from rest_framework import routers

from .views import VineView, BiereView, search_wine

router = routers.DefaultRouter()
router.register(r'wine', VineView, basename="vine")
router.register(r'biere', BiereView)

urlpatterns = [
    path('', include(router.urls)),
    path('wines', search_wine),
    # path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]