# Generated by Django 4.1.7 on 2023-06-28 09:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("home", "0018_linkclick"),
    ]

    operations = [
        migrations.AlterField(
            model_name="linkclick",
            name="url",
            field=models.CharField(max_length=200, unique=True),
        ),
    ]
