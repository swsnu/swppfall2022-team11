# Generated by Django 4.1.2 on 2022-12-04 04:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='userfullinfo',
            name='loverage',
            field=models.CharField(default='20', max_length=30),
        ),
        migrations.AddField(
            model_name='userfullinfo',
            name='lovergender',
            field=models.CharField(default='female', max_length=30),
        ),
    ]