from django.urls import path
from django.contrib import admin

from . import views

urlpatterns = [
    path('', views.gift_list),
    path('admin/', admin.site.urls),
]