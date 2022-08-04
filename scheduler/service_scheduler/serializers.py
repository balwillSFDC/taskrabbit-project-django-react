from rest_framework import serializers
from .models import User, Session, Service, Availability, Profile

################################
# Serializers
################################

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            'user',
            'id',
            'type',
            'bio',
            'specializations',
            'profile_pic'
        ]
        depth=1


class UserSerializer(serializers.ModelSerializer):
    # profile = ProfileSerializer(required=True)
    class Meta:
        model = User
        fields = [
            'id',
            'first_name',
            'last_name',
            'password',
            'email',
            'is_staff',
            'is_active',
            'username',
            'groups',
            # 'profile'
        ]

    # overwrite create method so that it encrpyts password field
    def create(self, validated_data):
        user = User(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            username=validated_data['username']
        )
        
        # encrypting password via 'set_password' method - doing this so api-token-auth endpoint works
        user.set_password(validated_data['password'])
        user.save()
        return user


class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = [
            'id',
            'createdDate', 
            'estimated_hours',
            'service', 
            'client', 
            'provider', 
            'status', 
            'availability'
        ]
        depth=3


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = [
            'id',
            'service',
            'description',
            'rate',
            'picture',
            'slug'
        ]


class AvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Availability
        fields = [
            'id',
            'status',
            'start_time',
            'end_time',
            'date',
            'provider',
            'is_closed'
        ]
        depth = 2
