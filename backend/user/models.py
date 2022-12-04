from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
# Create your models here.

class Anniversary(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE, related_name="Annivlist")
    name=models.CharField( max_length=30)
    date=models.CharField( max_length=30, default="2000-00-00")
    letter=models.CharField(default="False",max_length=30)
    gift=models.CharField(default="False",max_length=30)

class UserFullInfo(models.Model):
    user=models.OneToOneField(User, on_delete=models.CASCADE,
      primary_key=True ,related_name="info")
    lovername=models.CharField(max_length=30)
    lovernickname=models.CharField(max_length=30)
    loverage=models.CharField(max_length=30, default="20")
    lovergender=models.CharField(max_length=30,default="female")
    

    
