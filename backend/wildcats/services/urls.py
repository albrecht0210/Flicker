from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ServiceViewSet, ConnectionViewSet

router = DefaultRouter()
router.register(r'services', ServiceViewSet, basename='service')
router.register(r'connections', ConnectionViewSet, basename='connection')

urlpatterns = [
    path('', include(router.urls)),
]
