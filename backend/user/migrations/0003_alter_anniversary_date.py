# Generated by Django 4.1.2 on 2022-12-04 05:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_userfullinfo_loverage_userfullinfo_lovergender'),
    ]

    operations = [
        migrations.AlterField(
            model_name='anniversary',
            name='date',
            field=models.CharField(default='2000-00-00', max_length=30),
        ),
    ]
