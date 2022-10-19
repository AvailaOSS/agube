# Client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.6.

# Add GitHub Registry 🌍

Create your own [gitlab token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

```bash
npm config set @availaoss:registry https://npm.pkg.github.com/
npm config set //npm.pkg.github.com/:_authToken $GITHUB_AUTH_TOKEN
```
or
```bash
echo @availaoss:registry=https://npm.pkg.github.com >> .npmrc
```

## 🚀 Run Project

Let's start, Install dependencies!

```bash
npm install
```

Run client

```bash
ng serve
```

That's all 🥳, ensure that works -> [localhost](http://localhost:4200/)

## 👀 Google Analytics

Example of use
```js
gtag("event", "create_reservoir", {
    manager_id: 1,
    reservoir_id: 1,
    capacity: 7,
    outlet_flow: 70,
    inet_flow: 700,
});
```

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

📑 ___NOTE__: Add all events here for help us to detect its more easily_
