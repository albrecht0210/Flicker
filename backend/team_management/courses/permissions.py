from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsTestUser(BasePermission):
    def has_permission(self, request, view):
        print(request.user)
        print("HI")
        print(request.auth.payload)
        return True