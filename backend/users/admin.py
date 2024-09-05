from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from users.models import CustomUser

class UserAdmin(BaseUserAdmin):

    list_display = ["user_id","username","email","first_name","last_name","is_superuser"]
    list_filter = ["is_staff","is_superuser"]
    fieldsets = [
        (None, {"fields": ["email", "password"]}),
        ("Personal info", {"fields": ["first_name","last_name"]}),
        ("Permissions", {"fields": ["is_active","is_staff","is_superuser"]}),
    ]
    add_fieldsets = [
        (
            None,
            {
                "classes": ["wide"],
                "fields": ["email","first_name","last_name", "password1", "password2"],
            },
        ),
    ]
    search_fields = ["email"]
    ordering = ["email"]

admin.site.register(CustomUser,UserAdmin)