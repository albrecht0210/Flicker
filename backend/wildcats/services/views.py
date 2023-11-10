import requests
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Service, Connection
from .serializers import ServiceSerializer, ConnectionSerializer
from accounts.serializers import AccountSerializer

# Create your views here.
class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            
            response = self.request_to_callback_url()
            if response.status_code == 500:
                return Response({'error': 'Service request failed'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
            elif response.status_code == 401:
                return Response({'error': 'Not authorized'}, status=status.HTTP_401_UNAUTHORIZED)
            elif response.status_code == 400:
                return Response({'error': 'Data error' }, status=status.HTTP_400_BAD_REQUEST)
            elif response.status_code == 403:
                return Response({'error': 'Forbidden path' }, status=status.HTTP_403_FORBIDDEN)
            
            service_data = serializer.save()
            
            request_data = {
                'account': request.user.id,
                'service': service_data.id
            }

            connection_serializer = ConnectionSerializer(data=request_data)
            if connection_serializer.is_valid():
                connection_serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        return Response({'detail': 'Update operation not supported.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    def destroy(self, request, *args, **kwargs):
        return Response({'detail': 'Destroy operation not supported.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    def request_to_callback_url(self):
        token = RefreshToken.for_user(self.request.user)
        token['aud'] = self.request.data['identifier']
        token['admin'] = True
        headers = {
            'Authorization': f"Bearer {token.access_token}"
        }
        account_data = AccountSerializer(self.request.user, context={'request': self.request}).data
        account_data['choose_role'] = "admin"
        response = requests.post(self.request.data['callback_url'], data=account_data, headers=headers)
        
        return response

class ConnectionViewSet(viewsets.ModelViewSet):
    queryset = Connection.objects.all()
    serializer_class = ConnectionSerializer
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser)

    def update(self, request, *args, **kwargs):
        return Response({'detail': 'Update operation not supported.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    def destroy(self, request, *args, **kwargs):
        return Response({'detail': 'Destroy operation not supported.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
