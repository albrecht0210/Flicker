from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet, CourseByAccountAPIView

# Create a router for the CourseViewSet
router = DefaultRouter()
router.register(r'courses', CourseViewSet, basename='course')

urlpatterns = [
    # Include the router's URL patterns
    path('', include(router.urls)),

    path('courses/<int:pk>/add_member/', CourseViewSet.as_view({'post': 'add_member'}), name='add-member'),
    path('courses/<int:pk>/get_members/', CourseViewSet.as_view({'get': 'get_members'}), name='get-members'),
    path('courses/account/', CourseByAccountAPIView.as_view(), name='courses-by-account'),
]