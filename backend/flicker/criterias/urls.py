from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import CriteriaViewSet, MeetingCriteriaViewSet

router = DefaultRouter()
router.register(r'criteria', CriteriaViewSet, basename='criteria')
router.register(r'meeting-criteria', MeetingCriteriaViewSet, basename='meeting-criteria')

urlpatterns = [
    path('', include(router.urls)),
]