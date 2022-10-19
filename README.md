[![Agube Banner](https://raw.githubusercontent.com/AvailaOSS/.github/main/assets/Agube_Banner.png)](https://github.com/AvailaOSS)

[![App](https://img.shields.io/badge/App-Agube-lightgreen.svg)](https://www.agube.availa.eu)
[![WEB](https://img.shields.io/badge/Web-Availa-lightblue.svg)](https://www.availa.eu)
[![LinkedIN](https://img.shields.io/badge/LinkedIn-Availa-blue.svg)](https://www.linkedin.com/company/team-availa)

### Run 🚀

Create a [Github token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) to get access in [GitHub Package Registry](https://npm.pkg.github.com)

Prepare your environments variables

```bash
# Frontend
- GITHUB_AUTH_TOKEN: $GITHUB_AUTH_TOKEN # Required to download libraries
- GOOGLE_MAPS_API_KEY: "" # Optional, only if you want enable this feature
- GOOGLE_ANALYTICS_ID: "" # Optional, only if you want enable this feature

# Backend
- DJANGO_SECRET_KEY=$DEV_DJANGO_SECRET_KEY # Django secret key https://djecrety.ir generate and copy here!
- EMAIL_HOST=$DEV_SMTP_SERVER # The server needs send emails from SMTP Server
- EMAIL_HOST_USER=$DEV_USER_MAIL # SMTP Server needs User
- EMAIL_HOST_PASSWORD=$DEV_USER_MAIL_PASSWORD # SMTP Server needs password
```

Prepare docker

```bash
docker volume create --name agube-db-data
```

Run docker

```bash
docker compose up
```

That's all 🥳, ensure that works -> [localhost](http://localhost:8080)

## Getting Started 🛠️

- ### [Server 🖥️](/server/README.md)
- ### [Client 👨‍💻](/client/README.md)
- ### [API 🌍](/api/README.md)

## Contributors ✨

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->