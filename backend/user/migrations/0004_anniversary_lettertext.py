# Generated by Django 4.1.2 on 2022-12-04 07:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_alter_anniversary_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='anniversary',
            name='lettertext',
            field=models.TextField(default=''),
        ),
    ]