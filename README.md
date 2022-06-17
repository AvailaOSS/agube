# Agube

## 🚀 Start project

First step to start project

```bash
django-admin startproject agube
python -m venv venv
venv\Scripts\activate
pip install Django
```

## 💻 Django Commands

Commands for django applications

```bash
pip freeze > requirements.txt
pip install -r requirements.txt
```

```bash
python manage.py startapp [your-app-name]
```

```bash
python manage.py makemigrations
python manage.py migrate
```

```bash
python manage.py makemigrations --name [your-name] --empty [your-app]
```

```bash
python manage.py runserver
```

## 💿 sqlite3

Run project with local settings and sqlite3 (without docker image)

```bash
python manage.py runserver --settings agube.settings-local
python manage.py migrate --settings agube.settings-local
```

## 🐳 docker

Run project with docker images

```bash
cd docker
docker-compose up
```

## 📮 MQ

Run MQ consumer in new CLI

```bash
python manage.py agube-consumer.py
```

## ✅ Tests

Execute tests with coverage statistics

```bash
pytest --cov --cov-report=html
```


## ✔️ Check django project
```
python3 manage.py check --deploy
```