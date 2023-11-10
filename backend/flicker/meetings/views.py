from rest_framework import generics, permissions, viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Meeting
from .serializers import FillMeetingSerializer, MeetingSerializer
from pitches.models import Pitch
from pitches.serializers import PitchSerializer
from criterias.models import Criteria, MeetingCriteria
from criterias.serializers import CriteriaSerializer, MeetingCriteriaSerializer

# Create your views here.
class MeetingCreateAPIView(generics.CreateAPIView):
    serializer_class = FillMeetingSerializer
    permission_classes = (permissions.AllowAny,) # Change this to Teacher/AdminOnlyUser
    
class MeetingViewSet(viewsets.ModelViewSet):
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer
    permission_classes = (permissions.AllowAny,) # Change this to Teacher/AdminOnlyUserOrReadOnly

    def get_queryset(self):
        queryset = Meeting.objects.all()
        status_param = self.request.query_params.get('status', None)
        course_param = self.request.query_params.get('course', None)

        if course_param:
            queryset = queryset.filter(course=course_param)

        if status_param:
            queryset = queryset.filter(status=status_param)

        return queryset

    @action(detail=True, methods=['post'])
    def add_presentor(self, request, pk=None):
        meeting = self.get_object()  # Get the Meeting instance
        pitch_id = request.data.get('pitch')

        try:
            pitch = Pitch.objects.get(id=pitch_id)  # Assuming you have a Pitch model
        except Pitch.DoesNotExist:
            return Response({'error': 'Pitch not found'}, status=status.HTTP_404_NOT_FOUND)

        if pitch in meeting.presentors.all():
            return Response({'error': 'Pitch is already added to the meeting'}, status=status.HTTP_400_BAD_REQUEST)

        meeting.presentors.add(pitch)  # Add the pitch to the presentors ManyToMany field
        meeting.save()

        return Response({'success': 'Presenter added successfully'}, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['get'])
    def get_presentors(self, request, pk=None):
        meeting = self.get_object()  # Get the Meeting instance
        presentors = meeting.presentors.all()  # Retrieve the presentors for the meeting

        serializer = PitchSerializer(presentors, many=True)  # Assuming you have a PitchSerializer

        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def add_criteria(self, request, pk=None):
        meeting = self.get_object()  # Get the Meeting instance
        criteria_id = request.data.get('criteria')

        try:
            criteria = Criteria.objects.get(id=criteria_id)  # Assuming you have a Criteria model
        except Criteria.DoesNotExist:
            return Response({'error': 'Criteria not found'}, status=status.HTTP_404_NOT_FOUND)

        if criteria in meeting.criterias.all():
            return Response({'error': 'Criteria is already added to the meeting'}, status=status.HTTP_400_BAD_REQUEST)

        meeting.criterias.add(criteria)  # Add the criteria to the criterias ManyToMany field
        meeting.save()

        return Response({'success': 'Criteria added successfully'}, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['get'])
    def get_criterias(self, request, pk=None):
        meeting = self.get_object()  # Get the Meeting instance
        meeting_criterias = MeetingCriteria.objects.filter(meeting=meeting.id)  # Retrieve the criterias for the meeting

        serializer = MeetingCriteriaSerializer(meeting_criterias, many=True)  # Assuming you have a CriteriaSerializer
        
        return Response(serializer.data)


    