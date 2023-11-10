from rest_framework.permissions import BasePermission, SAFE_METHODS
from rest_framework_simplejwt.models import TokenUser

class IsWildcatAdmin(BasePermission):
    def has_permission(self, request, view):
        try:
            assert request.user and request.user.is_authenticated

            if request.auth.payload.get('admin'):
                return True
            # user = request.user
            # if isinstance(request.user, TokenUser):
            #     user_set = Account.objects.filter(id=user.id)
            #     if user_set.exists():
            #         user = user_set.first()
            #     else:
            #         return False
            # return user.email == SSO_ADMIN_EMAIL
        except AssertionError:
            return False

class IsWildcatAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return request.user and request.user.is_authenticated
        else:
            try:
                assert request.user and request.user.is_authenticated
                if request.auth.payload.get('admin'):
                    return True
            except AssertionError:
                return False