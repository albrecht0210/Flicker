from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth import get_user_model

from .models import Team
from .serializers import TeamSerializer
from .permissions import IsTeacherUserOrReadOnly
from accounts.serializers import AccountSerializer
from courses.models import Course

Account = get_user_model()

# Create your views here.
class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = (permissions.IsAuthenticated, IsTeacherUserOrReadOnly, )

    @action(detail=True, methods=['post'])
    def add_member(self, request, pk=None):
        team = self.get_object()
        account_id = request.data.get('account')
        members = team.members.all()

        if account_id is not None:
            try:
                account = Account.objects.get(pk=account_id)

                member_in_course = Course.objects.filter(id=team.course, members__in=account)
                if not member_in_course.exists():
                    return Response({'error': 'Account is not a member of the course.'}, status=status.HTTP_400_BAD_REQUEST)
                
                existing_team = Team.objects.filter(members__in=account).exclude(pk=team.pk)
                if existing_team.exists():
                    return Response({'error': 'Account is a member of other teams.'}, status=status.HTTP_400_BAD_REQUEST)

                if account in members:
                    return Response({'message': 'Member already added to the team.'}, status=status.HTTP_200_OK)
                else:
                    team.members.add(account) 
                    team.save()
                    return Response({'message': 'Member added successfully.'}, status=status.HTTP_200_OK)
            except Account.DoesNotExist:
                return Response({'error': 'Account not found.'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'Account ID is missing from the request data.'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'])
    def get_members(self, request, pk=None):
        team = self.get_object()
        members = team.members.all()

        serializer = AccountSerializer(members, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
    