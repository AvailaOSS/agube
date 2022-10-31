[![Agube Banner](https://raw.githubusercontent.com/AvailaOSS/.github/main/assets/Agube_Banner.png)](https://github.com/AvailaOSS)

[![App](https://img.shields.io/badge/App-Agube-lightgreen.svg)](https://www.agube.availa.eu)
[![WEB](https://img.shields.io/badge/Web-Availa-lightblue.svg)](https://www.availa.eu)
[![LinkedIN](https://img.shields.io/badge/LinkedIn-Availa-blue.svg)](https://www.linkedin.com/company/team-availa)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/855a8e18df374aa3b65c206ecda5c077)](https://www.codacy.com/gh/AvailaOSS/agube/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=AvailaOSS/agube&amp;utm_campaign=Badge_Grade)

## Run 🚀

Create a [Github token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) to get read access to [GitHub Package Registry](https://npm.pkg.github.com)

### Prepare your environment variables

Frontend:

| CONTAINER ENV            | HOST ENV                         | Description                          |
|--------------------------|----------------------------------|--------------------------------------|
| GITHUB_AUTH_TOKEN        | GITHUB_AUTH_TOKEN                | GitHub package registry token (read) |
| GOOGLE_MAPS_API_KEY      | Optional, set to enable feature  | Google Maps API Key                  |
| GOOGLE_ANALYTICS_ID      | Optional, set to enable feature  | Google Analytics ID                  |

Backend:

| CONTAINER ENV            | HOST ENV                         | Description                          |
|--------------------------|----------------------------------|--------------------------------------|
| DJANGO_SECRET_KEY        | DEV_DJANGO_SECRET_KEY            | Django secret key                    |
| EMAIL_HOST               | DEV_SMTP_SERVER                  | SMTP service host (default port 587) |
| EMAIL_HOST_USER          | DEV_USER_MAIL                    | Email sender account                 |
| EMAIL_HOST_PASSWORD      | DEV_USER_MAIL_PASSWORD           | Email sender account password        |

📑 ___NOTE___ _You can generate Django secret keys [here](https://djecrety.ir/)_

📑 ___NOTE___ _If you do not have / need to use a SMTP service you can output the email in the console by adding_ EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend' _in_ [server/agube/settings.py](server/agube/settings.py) _(email user and pasword are ignored)_

### Prepare docker

```bash
docker volume create --name agube-db-data
docker volume create --name agube-data
```

### Run docker

```bash
docker compose up
```

### Generate DB (in new terminal)

```bash
docker exec -it agube-be python3 manage.py migrate
```

### Create a Manager account (password input will prompt)

```bash
python manage.py createmanager <username> <email> <first_name> <last_name> <phone_number>
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
<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://www.linkedin.com/in/fran-abril-a8424419a/"><img src="https://avatars.githubusercontent.com/u/10210729?v=4?s=100" width="100px;" alt="Fran"/><br /><sub><b>Fran</b></sub></a><br /><a href="#projectManagement-Fran-Abril" title="Project Management">📆</a> <a href="https://github.com/AvailaOSS/agube/commits?author=Fran-Abril" title="Code">💻</a> <a href="#design-Fran-Abril" title="Design">🎨</a> <a href="https://github.com/AvailaOSS/agube/issues?q=author%3AFran-Abril" title="Bug reports">🐛</a> <a href="#business-Fran-Abril" title="Business development">💼</a> <a href="https://github.com/AvailaOSS/agube/commits?author=Fran-Abril" title="Documentation">📖</a> <a href="#ideas-Fran-Abril" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-Fran-Abril" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-Fran-Abril" title="Maintenance">🚧</a> <a href="#research-Fran-Abril" title="Research">🔬</a> <a href="https://github.com/AvailaOSS/agube/pulls?q=is%3Apr+reviewed-by%3AFran-Abril" title="Reviewed Pull Requests">👀</a></td>
      <td align="center"><a href="https://www.linkedin.com/in/santiago-bol%C3%A1s-lago-202b60194/"><img src="https://avatars.githubusercontent.com/u/115986710?v=4?s=100" width="100px;" alt="Santiago Bolás Lago"/><br /><sub><b>Santiago Bolás Lago</b></sub></a><br /><a href="#projectManagement-Zumito93" title="Project Management">📆</a> <a href="https://github.com/AvailaOSS/agube/commits?author=Zumito93" title="Code">💻</a></td>
      <td align="center"><a href="https://www.linkedin.com/in/germán-martín-garisto-viso-96905ab7/"><img src="https://avatars.githubusercontent.com/u/750404?v=4?s=100" width="100px;" alt="Germán  Martín Garisto Viso"/><br /><sub><b>Germán  Martín Garisto Viso</b></sub></a><br /><a href="#projectManagement-German14" title="Project Management">📆</a> <a href="https://github.com/AvailaOSS/agube/commits?author=German14" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## LICENSE

[Apache License Version 2.0](LICENSE.md)