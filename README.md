# Agube - Water Management

Frontend SPA for Agube - Water Management using Angular Framework.

<br>

## 🏡 Frontend

___

- ## ⏬ How to install

  _Ensure that you already have [node](https://nodejs.org/es/) installed in to your computer_

  Go to folder and run the follow command:

  > npm install

- ## 🚀 How to Run

  After install, run the follow command:

  > npm run start

<br>

## 💻 Backend

___

This application is built with several interconnected microservices. It is developed with [python 3](https://www.python.org), [django](https://www.djangoproject.com/), [DRF](https://www.django-rest-framework.org/) and [docker](https://www.docker.com/) among other libraries.

- ## ⏬ Installation and Running

  Before install, ensure that you already have  [docker](https://www.docker.com/) installed into your computer and then follow the next steps.

  Run docker and exec:

  > docker-compose up

  Now, into each docker container run the follow commands:

  - ## Auth

    run migrations
      > python manage.py migrate

  - ## Subscription

    run migrations
      > python manage.py migrate

    create permissions
      > python manage.py migrate_permissions --group unlimited --content_type_ids 7 8 9 10 11 12 13
      > python manage.py migrate_permissions --group limited --content_type_ids 9 10 11 12 13

  - ## Contact Book

    run migrations
      > python manage.py migrate

    run celery
      > celery -A contactbook.celery worker -l INFO

  - ## Agube

    run migrations
      > python manage.py migrate

    run celery
      > celery -A agube.celery worker -l INFO

  - ## Task

    run migrations
      > python manage.py migrate

  All already works!
