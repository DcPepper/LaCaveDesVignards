from django.urls import include, path
from rest_framework import routers

from .views import VineView, BiereView

router = routers.DefaultRouter()
router.register(r'wine', VineView)
router.register(r'biere', BiereView)

urlpatterns = [
    path('', include(router.urls)),
    # path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]