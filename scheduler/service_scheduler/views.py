from xml.etree.ElementTree import tostring
from django.db import IntegrityError
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User, Profile, Session, Service, Availability
from .serializers import UserSerializer, ProfileSerializer, SessionSerializer, ServiceSerializer, AvailabilitySerializer
from django_filters.rest_framework import DjangoFilterBackend
from datetime import timedelta, datetime
import json
import math

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserList(viewsets.GenericViewSet):
    serializer_class = UserSerializer


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    filterset_fields  = ['type', 'user__username']


class SessionViewSet(viewsets.ModelViewSet):
    queryset = Session.objects.all().order_by('availability__date')
    serializer_class = SessionSerializer
    filterset_fields = ['client__username', 'provider__username']


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    filterset_fields = ['slug']


class AvailabilityViewSet(viewsets.ModelViewSet):
    # return results ordered in chronological order by date + datetime
    queryset = Availability.objects.filter(status='available').order_by('date', 'start_time')
    serializer_class = AvailabilitySerializer
    filterset_fields = ['status', 'provider__specializations__slug']


# Creates a session
class SessionCreate(APIView):
    def post(self, request, format=None):         
        body = json.loads(request.body)
        
        # Try to identify service with id provided - if none found, return error
        try:     
            service = Service.objects.get(service=body['service'])
        except IntegrityError as e:
            print(e)
            return Response(data={
                'message': 'Service does not exist'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Try to identify client's profile with id provided - if none found, return error
        try: 
            client = Profile.objects.get(pk=body['client'])
        except IntegrityError as e:
            print(e)
            return Response(data={
                'message': 'Client Profile does not exist'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Try to identify Provider's profile with id provided - if none found, return error
        try: 
            provider = Profile.objects.get(pk=body['provider'])
        except IntegrityError as e:
            print(e)
            return Response(data={
                'message': 'Provider Profile does not exist'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Try to identify Availability with id provided - if none found, return error
        try: 
            availability = Availability.objects.get(pk=body['availability'])
        except IntegrityError as e: 
            print(e)
            return Response(data={
                'message': 'Availability does not exist'
            }, status=status.HTTP_400_BAD_REQUEST)
       
        # check that the provider selected for the session is also the one listed 
        # on the avaiability record 
        if provider != Profile.objects.get(pk=availability.provider.id):
            return Response(date={
                'message': 'Provider selected is not the one listed on the availability'
            }, status=status.HTTP_400_BAD_REQUEST)

        # converts time to datetime and adds time delta to get new start_time
        def time_plus(time, timedelta):
            start = datetime(
                2000, 1, 1,
                hour=time.hour, minute=time.minute, second=time.second
            )
            end = start + timedelta
            return end.time()

        def calculate_hours_left(end_time, start_time):
            return math.ceil(end_time.hour - start_time.hour)

        hours_available = calculate_hours_left(availability.end_time, availability.start_time)  

        # check that availability has enough hours for session
        if hours_available < int(body['estimated_hours']):
            return Response(data={
                'message': 'Availability does not have enough hours to book session'
            }, status=status.HTTP_400_BAD_REQUEST)

        new_start_time = time_plus(availability.start_time, timedelta(hours=body['estimated_hours']))
        availability.start_time = new_start_time 

        # recalculate hours available after adjusting start time
        hours_available = calculate_hours_left(availability.end_time, new_start_time)  

        # if no hours left, update status to 'booked'
        if hours_available == 0:
            availability.status = 'booked'

        availability.save()



        new_session = Session.objects.create(
            estimated_hours=body['estimated_hours'],
            service=service,
            client=client,
            provider=provider,
            status=body['status'],
            availability = availability
        )
        new_session.save()

        return Response({
            'message': 'POST was successful',

        })
