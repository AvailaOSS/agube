# Server

## 🚀 Run Project

📑 ___NOTE1__: In local mode you do not need a database because we will use 💿 __sqlite3___

📑 ___NOTE2__: In local mode we need to always run __agube.settings-local___

Let's start, create your dev environment (python 3.8.x^)

```bash
cd server
python -m venv venv
```

Execute the environment

```bash
venv\Scripts\activate
```

we should see something like this `(venv) ..\agube\server>`

Continue, Install dependencies!

```bash
pip install -r requirements.txt
```

Run Database Migrations

```bash
python manage.py migrate --settings agube.settings-local
```

Run server

```bash
python manage.py runserver --settings agube.settings-local
```

Create a Manager account (password input will prompt)

```bash
python manage.py createmanager <username> <email> <first_name> <last_name> <phone_number> --settings=agube.settings-local
```

That's all 🥳, ensure that works -> [localhost](http://localhost:8000/swagger)

You must log in ("Django Login") with manager credentials in order to make requests

## ✅ Tests

Execute tests manually

```bash
python manage.py migrate --settings=agube.settings-local
python manage.py test agube.tests --settings=agube.settings-local
python manage.py test watermeter.tests --settings=agube.settings-local
```

Execute tests with coverage statistics

```bash
pytest
pytest --cov-report=html
```

## ✔️ Check django project

```bash
python3 manage.py check --deploy
```

## ✂️ Shortcuts

```bash
# replace settings with this at the end of each command
--settings=agube.settings-local
```

```bash
pip freeze > requirements.txt
```

```bash
python manage.py startapp [your-app-name]
```

```bash
python manage.py makemigrations [your-app-name] --name [your-name]
```

```bash
python manage.py runserver
```
