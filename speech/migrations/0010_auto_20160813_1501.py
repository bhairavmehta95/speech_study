# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-08-13 20:01
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('speech', '0009_auto_20160807_1850'),
    ]

    operations = [
        migrations.AlterField(
            model_name='class',
            name='class_name',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='topic',
            name='topic_name',
            field=models.CharField(max_length=100),
        ),
    ]