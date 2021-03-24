# Agube - Water Management

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.0.

- ## Development server

  Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

- ## Code scaffolding

  Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

- ## Build

  Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

- ## Running unit tests

  Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

- ## Running end-to-end tests

  Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

- ## Further help

  To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Backend
___

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
    > celery -A contactbook.celery worker --loglevel=info

- ## Agube

  run migrations
    > python manage.py migrate

  run celery
    > celery -A agube.celery worker --loglevel=info
