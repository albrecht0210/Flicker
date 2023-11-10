from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import AIFeedbackViewSet

router = DefaultRouter()
router.register(r'feedbacks', AIFeedbackViewSet, basename='feedback')

urlpatterns = [
    path('', include(router.urls)),
]