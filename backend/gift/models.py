from django.db import models

# Create your models here.
class Gift(models.Model):
    name = models.CharField(default="", max_length=64)
    price = models.IntegerField(default=0)
    link = models.URLField(default="", max_length=400)
    img = models.URLField(default="", max_length=400)

    def __str__(self):
        return self.name