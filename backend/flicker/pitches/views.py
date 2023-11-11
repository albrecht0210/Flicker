import requests
from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from .models import Pitch
from .serializers import PitchSerializer

# Create your views here.
class PitchViewSet(viewsets.ModelViewSet):
    queryset = Pitch.objects.all()
    serializer_class = PitchSerializer
    permission_classes = (permissions.AllowAny,) # Change this to Teacher/AdminOnlyUserOrReadOnly

    def validate_team(self, team_id):
        authorization_header = self.request.META.get('HTTP_AUTHORIZATION', None)
        _, token = authorization_header.split()

        headers = {'Authorization': f"Bearer {token}"}
        response = requests.get(f'http://localhost:8080/api/teams/{team_id}/', headers=headers)
        
        return response
    
    def create(self, request, *args, **kwargs):
        team_id = request.data.get('team')

        response = self.validate_team(team_id)

        response_mappings = {
            500: (status.HTTP_503_SERVICE_UNAVAILABLE, 'Team request failed'),
            401: (status.HTTP_401_UNAUTHORIZED, 'Not authorized'),
            400: (status.HTTP_400_BAD_REQUEST, 'Data error'),
            403: (status.HTTP_403_FORBIDDEN, 'Forbidden path'),
            404: (status.HTTP_404_NOT_FOUND, 'Team not found'),
        }

        if response.status_code in response_mappings:
            status_code, error_message = response_mappings[response.status_code]
            return Response({'error': error_message}, status=status_code)
        
        serializer = self.get_serializer(data=request.data, context={'request': request})
        print(serializer.is_valid())
        if response.status_code == 200 and serializer.is_valid():
            print("SUlod ka?")
            serializer.save()
                    
        return Response(serializer.data, status=status.HTTP_201_CREATED)