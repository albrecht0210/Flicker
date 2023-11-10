from rest_framework.permissions import BasePermission, SAFE_METHODS
from rest_framework_simplejwt.models import TokenUser

class IsTeacherUserOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return request.user and request.user.is_authenticated
        else:
            return request.user.get_role() == 'Teacher' or request.user.get_role() == 'Admin'