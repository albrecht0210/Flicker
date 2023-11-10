from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AccountViewSet, PreviewAccountViewSet, AccountProfileAPIView

router = DefaultRouter()
router.register(r'accounts', AccountViewSet, basename='account')
router.register(r'preview-accounts', PreviewAccountViewSet, basename='preview-account')

urlpatterns = [
    path('', include(router.urls)),

    path('accounts/<int:pk>/add_service/', AccountViewSet.as_view({'post': 'add_service'}), name='add-service'),
    path('accounts/<int:pk>/get_services/', AccountViewSet.as_view({'get': 'get_services'}), name='get-services'),

    path('account/profile/', AccountProfileAPIView.as_view(), name='profile'),
]