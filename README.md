Agube

# First step to start project

> django-admin startproject agube
> python -m venv venv
> venv\Scripts\activate
> pip install Django

# shortcuts

> pip freeze > requirements.txt
> pip install -r requirements.txt
> python manage.py runserver
> python manage.py makemigrations
> python manage.py makemigrations --name [your-name] --empty [your-app]
> python manage.py migrate
> python manage.py startapp [your-app-name]

# execute tests with coverage

> pytest --cov --cov-report=html