# Generated by Django 4.1 on 2022-08-10 21:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0011_wifi'),
    ]

    operations = [
        migrations.RenameField(
            model_name='wifi',
            old_name='ssid',
            new_name='name',
        ),
    ]