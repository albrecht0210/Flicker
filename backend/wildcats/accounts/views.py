import requests
from rest_framework import permissions, viewsets, status, generics
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Account
from .serializers import AccountSerializer, PreviewAccountSerializer
from .permissions import IsOwner, IsAdminOrReadOnly
from services.models import Service
from services.serializers import ConnectionSerializer, ServiceSerializer

# Create your views here.
class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = (permissions.IsAuthenticated, IsAdminOrReadOnly )

    def get_queryset(self):
        request_user = self.request.user
        return Account.objects.all().exclude(id=request_user.id)
    
    @action(detail=True, methods=['post'])
    def add_service(self, request, pk=None):
        request_data = {
            'account': pk,
            'service': request.data['service']
        }
        account_object = Account.objects.get(id=pk)

        try: 
            response = self.request_to_callback_url(request_data['service'], account_object)

            response_mappings = {
                500: (status.HTTP_503_SERVICE_UNAVAILABLE, 'Service request failed'),
                401: (status.HTTP_401_UNAUTHORIZED, 'Not authorized'),
                400: (status.HTTP_400_BAD_REQUEST, 'Data error'),
                403: (status.HTTP_403_FORBIDDEN, 'Forbidden path'),
                404: (status.HTTP_404_NOT_FOUND, 'Service not found'),
            }

            if response.status_code in response_mappings:
                status_code, error_message = response_mappings[response.status_code]
                return Response({'error': error_message}, status=status_code)
        except Service.DoesNotExist:
            return Response({'error': 'Service not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = ConnectionSerializer(data=request_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['get'])
    def get_services(self, request, pk=None):
        account_selected = self.get_object()
        services = account_selected.services.all()

        serializer = ServiceSerializer(services, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def request_to_callback_url(self, service, account):
        try:
            service_object = Service.objects.get(id=service)
        except Service.DoesNotExist:
            raise Service.DoesNotExist
        
        token = RefreshToken.for_user(self.request.user)
        token['aud'] = service_object.identifier
        token['admin'] = True
        headers = {
            'Authorization': f"Bearer {token.access_token}"
        }
        account_data = AccountSerializer(account, context={'request': self.request}).data
        account_data['choose_role'] = account_data['role'].lower()
        response = requests.post(service_object.callback_url, data=account_data, headers=headers)
        
        return response
    
class PreviewAccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = PreviewAccountSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def create(self, request, *args, **kwargs):
        return Response({'detail': 'Create operation not supported.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def update(self, request, *args, **kwargs):
        return Response({'detail': 'Update operation not supported.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    def destroy(self, request, *args, **kwargs):
        return Response({'detail': 'Destroy operation not supported.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
class AccountProfileAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwner, )

    def get_object(self):
        return self.request.user
