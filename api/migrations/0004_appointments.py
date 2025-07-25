# Generated by Django 5.1.5 on 2025-05-11 03:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_footballclub_attendance'),
    ]

    operations = [
        migrations.CreateModel(
            name='Appointments',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('startDate', models.DateField()),
                ('endDate', models.DateField()),
                ('comments', models.CharField(blank=True, max_length=1000, null=True)),
                ('status', models.CharField(max_length=200)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Appointments',
                'verbose_name_plural': 'Appointments',
            },
        ),
    ]
