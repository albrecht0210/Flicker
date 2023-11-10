# Generated by Django 4.2.6 on 2023-11-10 08:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('pitches', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='AIFeedback',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('feedback', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('pitch', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pitches.pitch')),
            ],
        ),
    ]
