# Generated by Django 4.1 on 2022-08-06 11:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("home", "0004_alter_resource_file_alter_resource_image"),
    ]

    operations = [
        migrations.AlterField(
            model_name="resource",
            name="file",
            field=models.FileField(
                max_length=200, unique=True, upload_to="C:/resources/files/"
            ),
        ),
        migrations.AlterField(
            model_name="resource",
            name="image",
            field=models.ImageField(upload_to="C:/resources/images/"),
        ),
    ]
