import logging

from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth import get_user_model

log = logging.getLogger("tasks")


class Command(BaseCommand):
    help = 'Crea el usuario administrador predeterminado'

    def handle(self, *args, **options):
        user_model = get_user_model()

        admin_exists = user_model.objects.filter(username="admin").exists()
        verbose_mode_is_enabled = options['verbosity'] >= 2

        if admin_exists:
            if verbose_mode_is_enabled:
                self.stdout.write(self.style.NOTICE(
                    'El usuario administrador predeterminado ya existe'
                ))
        else:
            user_model.objects.create_superuser(
                "admin", "admin@example.com", "secret"
            )
            if verbose_mode_is_enabled:
                self.stdout.write(self.style.SUCCESS(
                    'El usuario administrador predeterminado ha sido creado'
                ))
# from django.contrib.auth import get_user_model  
# from django.core.management.base import BaseCommand  
# from django.utils.crypto import get_random_string  


# User = get_user_model()


# class Command(BaseCommand):

#     def handle(self, *args, **kwargs):
#         email = 'admin@example.com'
#         new_password = "adminadmin"
#         try:
#             u = None

#             if not User.objects.filter(is_superuser=True).exists():
#                 self.stdout.write("No superusers found, creating one")
#                 u = User.objects.create_superuser(email=email, password=new_password)
#                 self.stdout.write("=======================")
#                 self.stdout.write("A superuser has been created")
#                 self.stdout.write(f"Email: {email}")
#                 self.stdout.write(f"Password: {new_password}")

#                 self.stdout.write("=======================")
#             else:
#                 self.stdout.write("A superuser exists in the database. Skipping.")
#         except Exception as e:
#             self.stderr.write(f"There was an error {e}")

# class Command(BaseCommand):
#     def handle(self, *args, **options):
#         username = 'lolo'
#         email = 'admin@example.com'
#         try:
#             u = None
#             if not User.objects.filter(username=username).exists() and not User.objects.filter(is_superuser=True).exists():
#                 print("admin user not found, creating one")
#                 new_password = get_random_string(10)
#                 u = User.objects.create_superuser(username, email, new_password)
#                 print(f"===================================")
#                 print(f"A superuser '{username}' was created with email '{email}' and password '{new_password}'")
#                 print(f"===================================")
#             else:
#                 print("admin user found. Skipping super user creation")
#                 print(u)
#         except Exception as e:
#             print(f"There was an error: {e}")