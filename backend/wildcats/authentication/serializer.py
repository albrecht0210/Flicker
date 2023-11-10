from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class WildcatTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        user_services = user.services.all()
        service_identifiers = [service.identifier for service in user_services]
        
        token['aud'] = service_identifiers

        if user.is_superuser:
            token['admin'] = True

        return token 