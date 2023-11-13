from rest_framework import viewsets, permissions
from .models import Criteria, MeetingCriteria
from .serializers import CriteriaSerializer, MeetingCriteriaSerializer
from flicker.permissions import IsTeacherUserOrReadOnly

# Create your views here.
class CriteriaViewSet(viewsets.ModelViewSet):
    queryset = Criteria.objects.all()
    serializer_class = CriteriaSerializer
    permission_classes = (permissions.IsAuthenticated, IsTeacherUserOrReadOnly, ) # Change this to TeacherOnlyUser

class MeetingCriteriaViewSet(viewsets.ModelViewSet):
    queryset = MeetingCriteria.objects.all()
    serializer_class = MeetingCriteriaSerializer
    permission_classes = (permissions.IsAuthenticated, IsTeacherUserOrReadOnly, ) # Change this to TeacherOnlyUser
