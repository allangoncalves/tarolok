# Generated by Django 2.2.11 on 2020-04-16 02:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='githuboauthuser',
            name='email',
        ),
    ]