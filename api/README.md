# Api

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.6.

## This is an Angular Library based on Swagger

1. Learn about [Swagger](https://swagger.io)

2. Run [server](/server/README.md) __as dev mode__

3. Navigate to [localhost](http://localhost:8003/swagger.json) and copy all

4. Go to [Swagger Editor](https://editor.swagger.io)

5. Toolbar menu, Generate Client > typescript-angular

6. Extract the download and copy your changes inside [api](/api/projects/agube-rest-api-lib/src/lib/) folder

- New __Models__ must be declared in [models.ts](/api/projects/agube-rest-api-lib/src/lib/model/models.ts)

    📑 ___NOTE__: __typescript-angular Generator__ does not respect the __snake_case___

- For New __Services__ :
    1. The __constructor__ must be overridden with the following code:
    ```typescript
        protected basePath: string = '';
        public defaultHeaders: HttpHeaders = new HttpHeaders();
        public configuration = new Configuration();

        constructor(
            protected httpClient: HttpClient,
            private svcConfig: AgubeRestConfigurationService,
            @Optional() configuration: Configuration
        ) {
            if (configuration) {
                this.configuration = configuration;
                this.basePath = configuration.basePath || this.basePath;
            }
            this.basePath = this.svcConfig.getBasePath();
        }
    ```
    2. Must be declared in
        - [api.ts](/api/projects/agube-rest-api-lib/src/lib/service/api.ts)
        - [agube.api.module.ts](/api/projects/agube-rest-api-lib/src/lib/agube.api.module.ts) as __Provider__ in providers: [...]

7. Edit api version in
    - [package.json](/api/package.json)
    - [package-lock.json](/api/package-lock.json)
    - [api package.json](/api/projects/agube-rest-api-lib/package.json)

    📑 ___NOTE__: Use Semantic Versioning Specification -> [Semver](https://semver.org/lang/es/)

# Publish 🌍

Create your own [gitlab token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

```bash
npm config set @availaoss:registry https://npm.pkg.github.com
npm login --scope=@availaoss --registry=https://npm.pkg.github.com/
npm config set registry https://npm.pkg.github.com
npm run package-publish
```