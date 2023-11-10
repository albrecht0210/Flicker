from rest_framework import viewsets, permissions
from .models import AIFeedback
from .serializers import AIFeedbackSerializer

# Create your views here.

class AIFeedbackViewSet(viewsets.ModelViewSet):
    queryset = AIFeedback.objects.all()
    serializer_class = AIFeedbackSerializer
    permission_classes = (permissions.AllowAny,) # Change this to TeacherOnlyUser