from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.contrib.auth.password_validation import validate_password
from django.db import transaction

from agube.tasks import create_manager
from getpass import getpass


class Command(BaseCommand):
    help = 'Create a manager user'

    def add_arguments(self, parser) -> None:
        parser.add_argument('username', type=str)
        parser.add_argument('email', type=str)
        parser.add_argument('first_name', type=str)
        parser.add_argument('last_name', type=str)
        parser.add_argument('phone_number', type=str)

    def handle(self, *args, **options):
        User = get_user_model()

        # Check username already exists
        try:
            user = User.objects.get(username=options['username'])
            self.stderr.write('Error: Username "%s" already exists' % user.username)
            return
        except ObjectDoesNotExist:
            pass

        # Password prompt
        password = getpass()
        password2 = getpass('Password (again): ')
        # Password validation (django password validation)
        if password != password2:
            self.stderr.write("Error: Your passwords didn't match.")
            return
        if password.strip() == '':
            self.stderr.write("Error: Blank passwords aren't allowed.")
            return
        try:
            validate_password(password2)
        except ValidationError as err:
            self.stderr.write('\n'.join(err.messages))
            response = input(
                'Bypass password validation and create user anyway? [y/N]: ')
            if response.lower() != 'y':
                return

        # Create user
        with transaction.atomic():
            user = User.objects.create(username=options['username'],
                                    email=options['email'],
                                    first_name=options['first_name'],
                                    last_name=options['last_name'])
            user.set_password(password2)
            user.save()

            # Create manager from user
            create_manager(user, options['phone_number'])

        self.stdout.write(
            self.style.SUCCESS('Succesfully created manager "%s"' %
                               user.username))
