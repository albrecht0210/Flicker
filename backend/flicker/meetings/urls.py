from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MeetingCreateAPIView, MeetingViewSet

router = DefaultRouter()
router.register(r'meetings', MeetingViewSet, basename='meeting')

urlpatterns = [
    path('meetings/create/', MeetingCreateAPIView.as_view(), name='meeting-create'),
    path('', include(router.urls)),

    path('meetings/<int:pk>/add_presentor/', MeetingViewSet.as_view({'post': 'add_presentor'}), name='add-presentor'),
    path('meetings/<int:pk>/add_presentors/', MeetingViewSet.as_view({'get': 'add_presentors'}), name='get-presentors'),

    path('meetings/<int:pk>/add_criteria/', MeetingViewSet.as_view({'post': 'add_criteria'}), name='add-criteria'),
    path('meetings/<int:pk>/get_criterias/', MeetingViewSet.as_view({'get': 'get_criterias'}), name='get-criterias'),
]
