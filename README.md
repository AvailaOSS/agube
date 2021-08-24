Agube
===

## 🚀 start project
First step to start project
```
 django-admin startproject agube
```
```
 python -m venv venv
```
```
 venv\Scripts\activate
```
```
 pip install Django
```

## ✂️ shortcuts
Shortcuts utils for django applications
```
 pip freeze > requirements.txt
```
```
 pip install -r requirements.txt
```
```
 python manage.py runserver
```
```
 python manage.py makemigrations
```
```
 python manage.py makemigrations --name [your-name] --empty [your-app]
```
```
 python manage.py migrate
```
```
 python manage.py startapp [your-app-name]
```

## 💿 sqlite3
run project with local settings and sqlite3 (without docker image)
```
 python manage.py runserver --settings agube.settings-local
```
```
 python manage.py migrate --settings agube.settings-local
```

## 🐳 docker
run project with docker images
```
 cd docker
```
```
 docker-compose up
```

## 🍆 celery
run celery to use rabbitmq queues into the application
```
 celery -A agube.celery worker -l INFO
```

## 🌷 flower
run flower to show info of rabbitmq queues
```
 celery -A agube.celery flower --port=5555
```

## ✅ tests
execute tests with coverage statistics
```
 pytest --cov --cov-report=html
```
