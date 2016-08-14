# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-08-14 14:25
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('speech', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='completion',
            name='question_id',
        ),
        migrations.RemoveField(
            model_name='completion',
            name='student_id',
        ),
        migrations.RemoveField(
            model_name='enrollments',
            name='class_id',
        ),
        migrations.RemoveField(
            model_name='enrollments',
            name='student_id',
        ),
        migrations.RemoveField(
            model_name='question',
            name='class_id',
        ),
        migrations.RemoveField(
            model_name='question',
            name='topic_id',
        ),
        migrations.DeleteModel(
            name='SelfStudy',
        ),
        migrations.DeleteModel(
            name='Testing',
        ),
        migrations.RemoveField(
            model_name='topic',
            name='class_id',
        ),
        migrations.DeleteModel(
            name='Class',
        ),
        migrations.DeleteModel(
            name='Completion',
        ),
        migrations.DeleteModel(
            name='Enrollments',
        ),
        migrations.DeleteModel(
            name='Question',
        ),
        migrations.DeleteModel(
            name='Student',
        ),
        migrations.DeleteModel(
            name='Topic',
        ),
    ]
