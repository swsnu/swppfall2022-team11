from django.urls import path


from . import views

urlpatterns = [
    path('', views.gift_list),
    path('shop_keyword/', views.shop_keyword, name='shop_keyword'),
]