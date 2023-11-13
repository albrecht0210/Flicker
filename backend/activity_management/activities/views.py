import requests
import json
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Activity
from .serializers import ActivitySerializer
from .permissions import IsTeacherUserOrReadOnly

# Create your views here.
class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    permission_classes = (permissions.IsAuthenticated, IsTeacherUserOrReadOnly, )

    def validate_course(self, course_id):
        authorization_header = self.request.META.get('HTTP_AUTHORIZATION', None)
        _, token = authorization_header.split()

        headers = {'Authorization': f"Bearer {token}"}
        response = requests.get(f'http://localhost:8080/api/courses/{course_id}/', headers=headers)

        return response

    def validate_service(self, service_id):
        authorization_header = self.request.META.get('HTTP_AUTHORIZATION', None)
        _, token = authorization_header.split()

        headers = {'Authorization': f"Bearer {token}"}
        response = requests.get(f'http://localhost:8000/api/services/{service_id}/', headers=headers)

        return response
    
    def push_activity_to_teknoplat(self, request_data):
        authorization_header = self.request.META.get('HTTP_AUTHORIZATION', None)
        _, token = authorization_header.split()

        headers = {'Authorization': f"Bearer {token}"}
        response = requests.post(f'http://localhost:8008/api/meetings/create/', data=request_data, headers=headers)

        return response
    
    def create(self, request, *args, **kwargs):
        # Extract data from the request
        course_id = request.data.get('course')
        service_id = request.data.get('service')

        # Validate course and service
        response_course = self.validate_course(course_id)
        response_service = self.validate_service(service_id)

        response_course_mappings = {
            500: (status.HTTP_503_SERVICE_UNAVAILABLE, 'Course request failed'),
            401: (status.HTTP_401_UNAUTHORIZED, 'Not authorized'),
            400: (status.HTTP_400_BAD_REQUEST, 'Data error'),
            403: (status.HTTP_403_FORBIDDEN, 'Forbidden path'),
            404: (status.HTTP_404_NOT_FOUND, 'Course not found'),
        }

        response_service_mappings = {
            500: (status.HTTP_503_SERVICE_UNAVAILABLE, 'Service request failed'),
            401: (status.HTTP_401_UNAUTHORIZED, 'Not authorized'),
            400: (status.HTTP_400_BAD_REQUEST, 'Data error'),
            403: (status.HTTP_403_FORBIDDEN, 'Forbidden path'),
            404: (status.HTTP_404_NOT_FOUND, 'Service not found'),
        }

        if response_course.status_code in response_course_mappings:
            status_code, error_message = response_course_mappings[response_course.status_code]
            return Response({'error': error_message}, status=status_code)

        if response_service.status_code in response_service_mappings:
            status_code, error_message = response_service_mappings[response_service.status_code]
            return Response({'error': error_message}, status=status_code)

        meeting_data = {
            'name': request.data.get('title'),
            'description': request.data.get('description'),
            'course': request.data.get('course'),
            'status':  request.data.get('status')
        }

        res_data = json.loads(response_service.content.decode('utf-8'))
        
        if "teknoplat" in res_data['identifier'].lower():
            response_meeting_create = self.push_activity_to_teknoplat(meeting_data)

            response_meeting_create_mappings = {
                500: (status.HTTP_503_SERVICE_UNAVAILABLE, 'Create meeting request failed'),
                401: (status.HTTP_401_UNAUTHORIZED, 'Not authorized'),
                400: (status.HTTP_400_BAD_REQUEST, 'Data error'),
                403: (status.HTTP_403_FORBIDDEN, 'Forbidden path'),
            }

            if response_meeting_create.status_code in response_meeting_create_mappings:
                status_code, error_message = response_meeting_create_mappings[response_meeting_create.status_code]
                return Response({'error': error_message}, status=status_code)

        # If all checks pass, proceed with the standard creation
        serializer = self.get_serializer(data=request.data, context={'request': request})
        
        if response_course.status_code == 200 and response_service.status_code == 200 and serializer.is_valid():
            serializer.save()
                    
        return Response(serializer.data, status=status.HTTP_201_CREATED)