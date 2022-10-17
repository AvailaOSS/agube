# AgubeFe

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Clean cache docker build

> docker builder prune -af

## 🐋 Publish In Docker

Publish Frontend Image into Gitlab Registry

> docker build --no-cache -t registry.gitlab.com/availa/proyectos/agube/frontend/agube-fe .

> docker build -t $CI_REGISTRY_IMAGE:$RELEASE_VERSION"-SNAPSHOT" . --build-arg GITLAB_AUTH_TOKEN="$GITLAB_AUTH_TOKEN" --build-arg APP_NAME=Agube --build-arg GOOGLE_MAPS_API_KEY="" --build-arg GOOGLE_ANALYTICS_ID="" --build-arg AUTH_BACKEND_API_URL="http://localhost:30004" --build-arg SUBSCRIPTION_BACKEND_API_URL="http://localhost:30001" --build-arg CONTACT_BOOK_BACKEND_API_URL="http://localhost:30002" --build-arg AGUBE_BACKEND_API_URL="http://localhost:30003"

> docker push registry.gitlab.com/availa/proyectos/agube/frontend/agube-fe

## publish in google analytics
> EXAMPLE:
    gtag("event", "create_reservoir", {
        manager_id: 1,
        reservoir_id: 1,
        capacity: 7,
        outlet_flow: 70,
        inet_flow: 700,
    });


|PROJECT |EVENT | DESCRIPTION |
|---|---|---|
| agube | create_reservoir | manager create new reservoir |
| agube | create_reservoir_exit | manager create new reservoir and exit |
| agube | view_reservoir | manager click on reservoir detail |
| agube | create_dwelling | manager create new dwelling |
| agube | create_dwelling_exit | manager create new dwelling and exit |
| agube | view_dwelling | manager click on dwelling detail |
| agube | create_owner | manager create new owner |
| agube | create_resident | manager create new resident |
| agube | update_address | manager edit address |
| agube | update_manager_parameters | manager update parameters |
| agube | view_resident | manager click on resident´s list view |
| agube | view_owner | manager click on owner´s list view |
| agube | view_person | manager click on person detail view |
| agube | theme_type | user selected theme |
| agube | language | user selected language |
| agube | update_measure | old and new |
| contact-book | create_contact_book_tag | manager create tag contact |
| contact-book | view_contact_book | manager open contact |
| contact-book | add_contact_book | manager add new contact |
