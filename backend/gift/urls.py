from django.urls import path
from django.contrib import admin

from . import views

urlpatterns = [
    path('', views.gift_list),
    path('admin/', admin.site.urls),
    path('shop_keyword/', views.shop_keyword, name='shop_keyword')
]