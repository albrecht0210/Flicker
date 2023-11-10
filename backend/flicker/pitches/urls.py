from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PitchViewSet

# Create a router for the ActivityViewSet
router = DefaultRouter()
router.register(r'pitches', PitchViewSet, basename='pitch')

urlpatterns = [
    # Include the router's URL patterns
    path('', include(router.urls)),
]