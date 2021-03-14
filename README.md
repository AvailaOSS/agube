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

# run celery
> celery -A agube.celery worker --loglevel=info

# execute tests with coverage

> pytest --cov --cov-report=html

# Example post:
```json
{
  "full_address": {
    "address": {
      "town": "star wars",
      "street": "galaxia",
      "is_external": true
    },
    "number": 1,
    "flat": "lejana",
    "gate": "muy muy"
  },
  "paymaster": {
    "payment_type": "BANK",
    "iban": "999999999999999",
    "username": "thor"
  },
  "owner": {
    "username": "thor",
    "first_name": "dios",
    "last_name": "vikingo",
    "email": "thor@avenger.com",
    "phones": [
      {
        "phone_number": "35463546"
      }
    ],
    "address": [
      {
        "address": {
          "town": "star trek",
          "street": "galaxia",
          "is_external": true
        },
        "number": 1,
        "flat": "lejana",
        "gate": "Puerta"
      }
    ]
  },
  "resident": {
    "username": "hulk",
    "first_name": "Bruce",
    "last_name": "Banner",
    "email": "bruce@avengers.com",
    "phones": [
      {
        "phone_number": "648428356"
      }
    ],
    "address": [
      {
        "address": {
          "town": "Vulkano",
          "street": "yo que se",
          "is_external": true
        },
        "number": 1,
        "flat": "a saber",
        "gate": "vaya"
      }
    ]
  },
  "water_meter": {
    "code": "yt4315w53graes"
  }
}
```