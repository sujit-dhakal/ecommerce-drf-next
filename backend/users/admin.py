from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from users.form import UserChangeForm,UserCreationForm
from users.models import CustomUser

class UserAdmin(BaseUserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm

    list_display = ["email","firstName","lastName","is_superuser"]
    list_filter = ["is_staff","is_superuser"]
    fieldsets = [
        (None, {"fields": ["email", "password"]}),
        ("Personal info", {"fields": ["firstName","middleName","lastName"]}),
        ("Permissions", {"fields": ["is_active","is_staff","is_superuser"]}),
    ]
    add_fieldsets = [
        (
            None,
            {
                "classes": ["wide"],
                "fields": ["email","firstName","middleName","lastName", "password1", "password2"],
            },
        ),
    ]
    search_fields = ["email"]
    ordering = ["email"]

admin.site.register(CustomUser,UserAdmin)