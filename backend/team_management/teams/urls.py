from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TeamViewSet

# Create a router for the TeamViewSet
router = DefaultRouter()
router.register(r'teams', TeamViewSet, basename='team')

urlpatterns = [
    # Include the router's URL patterns
    path('', include(router.urls)),

    path('teams/<int:pk>/add_member/', TeamViewSet.as_view({'post': 'add_member'}), name='add-member'),
    path('teams/<int:pk>/get_members/', TeamViewSet.as_view({'get': 'get_members'}), name='get-members'),
]