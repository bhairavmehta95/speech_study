# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('speech', '0012_auto_20160813_1840'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='enrollments',
            name='class_id',
        ),
        migrations.RemoveField(
            model_name='enrollments',
            name='student_id',
        ),
    ]