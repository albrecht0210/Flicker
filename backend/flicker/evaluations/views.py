from rest_framework import viewsets, permissions
from .models import Evaluation
from .serializers import EvaluationSerializer

# Create your views here.

class EvaluationViewSet(viewsets.ModelViewSet):
    queryset = Evaluation.objects.all()
    serializer_class = EvaluationSerializer
    permission_classes = (permissions.AllowAny,) # Change this to TeacherOnlyUser