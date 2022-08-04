from email.mime import base
from posixpath import basename
from django.contrib import admin
from django.urls import path, include
from . import views
from rest_framework import routers, status
from rest_framework.authtoken import views
from .views import UserList, UserViewSet, ProfileViewSet, SessionViewSet, ServiceViewSet, AvailabilityViewSet, SessionCreate


# Initiate Router and register sessions endpoint + viewset
router = routers.DefaultRouter()
router.register('users', UserViewSet, basename='User')
router.register('profiles', ProfileViewSet, basename='Profile')
router.register('sessions', SessionViewSet, basename='Session')
router.register('services', ServiceViewSet, basename='Service')
router.register('availabilities', AvailabilityViewSet, basename='Availability')
# router.register('user-create', UserList, basename='User')

# url patterns
urlpatterns = [
    path("api/", include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api-token-auth/', views.obtain_auth_token),
    path('api/sessions/create', SessionCreate.as_view())
]
