from rest_framework import viewsets, permissions, status, generics
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth import get_user_model

from .models import Course
from .serializers import CourseSerializer
from accounts.serializers import AccountSerializer
from team_management.permissions import IsWildcatAdminOrReadOnly
from .permissions import IsTestUser

Account = get_user_model()

# Create your views here.
class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = (permissions.IsAuthenticated, IsWildcatAdminOrReadOnly, )

    @action(detail=True, methods=['post'])
    def add_member(self, request, pk=None):
        course = self.get_object()
        account_id = request.data.get('account')
        members = course.members.all()

        if account_id is not None:
            try:
                account = Account.objects.get(pk=account_id)
                if account.is_staff and members.filter(is_staff=True).exists():
                    return Response({'error': 'A staff member is already a member of the course.'}, status=status.HTTP_400_BAD_REQUEST)
                
                existing_course = Course.objects.filter(name=course.name, section=course.section, members__in=[account]).exclude(pk=course.pk)
                if existing_course.exists():
                    return Response({'error': 'Account has already enrolled in a course with the same name.'}, status=status.HTTP_400_BAD_REQUEST)

                if account in members:
                    return Response({'message': 'Member already added to the course.'}, status=status.HTTP_200_OK)
                else:
                    course.members.add(account)
                    course.save()
                    return Response({'message': 'Member added successfully.'}, status=status.HTTP_200_OK)
            except Account.DoesNotExist:
                return Response({'error': 'Account not found.'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'Account ID is missing from the request data.'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'])
    def get_members(self, request, pk=None):
        course = self.get_object()
        members = course.members.all()

        serializer = AccountSerializer(members, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
    
class CourseByAccountAPIView(generics.ListAPIView):
    serializer_class = CourseSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def get_queryset(self):
        try:
            print(self.request.user)
            queryset = Course.objects.filter(members__in=[self.request.user])
            if not queryset.exists():
                raise Course.DoesNotExist
            return queryset
        except Course.DoesNotExist:
            # Handle the exception, log it, or return an appropriate error response
            return Response({"error": "Account does not exists."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    