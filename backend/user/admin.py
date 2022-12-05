from django.contrib import admin
from .models import Anniversary,UserFullInfo
from django.contrib.auth.models import User

# Register your models here.
admin.site.register(Anniversary)
admin.site.register(UserFullInfo)
