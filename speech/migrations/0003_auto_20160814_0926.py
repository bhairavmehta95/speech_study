# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-08-14 14:26
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('speech', '0002_auto_20160814_0925'),
    ]

    operations = [
        migrations.CreateModel(
            name='Class',
            fields=[
                ('class_id', models.AutoField(primary_key=True, serialize=False)),
                ('class_name', models.CharField(max_length=100)),
                ('num_enrollments', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Completion',
            fields=[
                ('completion_id', models.AutoField(primary_key=True, serialize=False)),
                ('transcript', models.TextField()),
                ('percent_scored', models.FloatField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Enrollments',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('class_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='speech.Class')),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('question_id', models.AutoField(primary_key=True, serialize=False)),
                ('question_subject', models.CharField(default=b'QUESTION', max_length=100)),
                ('question_text', models.TextField()),
                ('num_attempts', models.IntegerField(default=0)),
                ('num_accepted', models.IntegerField(default=0)),
                ('is_user_generated', models.BooleanField(default=False)),
                ('is_mandatory', models.BooleanField(default=False)),
                ('percent_to_pass', models.FloatField(default=0.5)),
                ('class_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='speech.Class')),
            ],
        ),
        migrations.CreateModel(
            name='SelfStudy',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('student_id', models.AutoField(primary_key=True, serialize=False)),
                ('f_name', models.CharField(max_length=30)),
                ('l_name', models.CharField(max_length=30)),
                ('user_id_login', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Testing',
            fields=[
                ('test_id', models.AutoField(primary_key=True, serialize=False)),
                ('topic_name', models.CharField(max_length=100)),
                ('question_subject', models.CharField(max_length=100)),
                ('question_text', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Topic',
            fields=[
                ('topic_id', models.AutoField(primary_key=True, serialize=False)),
                ('topic_name', models.CharField(max_length=100)),
                ('num_questions', models.IntegerField(default=0)),
                ('class_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='speech.Class')),
            ],
        ),
        migrations.AddField(
            model_name='question',
            name='topic_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='speech.Topic'),
        ),
        migrations.AddField(
            model_name='enrollments',
            name='student_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='speech.Student'),
        ),
        migrations.AddField(
            model_name='completion',
            name='question_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='speech.Question'),
        ),
        migrations.AddField(
            model_name='completion',
            name='student_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='speech.Student'),
        ),
    ]
