from django.contrib import admin
from .models import Service, User, Profile, Session, Availability

# Register your models here.
class UserAdmin(admin.ModelAdmin):
    pass


class ProfileAdmin(admin.ModelAdmin):
    pass


class ServiceAdmin(admin.ModelAdmin):
    pass


class SessionAdmin(admin.ModelAdmin):
    pass


class AvailabilityAdmin(admin.ModelAdmin):
    pass


admin.site.register(User, UserAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(Service, ServiceAdmin)
admin.site.register(Session, SessionAdmin)
admin.site.register(Availability, AvailabilityAdmin)
