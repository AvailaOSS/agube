# agube-rest-api

Agube API Librería para proyectos Angular/Ionic

## Step 1 - Generating your service and models from swagger.json

Go to ```{your-temp-folder}``` and follow next commands:

> git clone https://github.com/swagger-api/swagger-codegen.git
>
> cd swagger-codegen
>
> mvn clean install
>

Return to ```this README.md path``` and:

> COPY {your-temp-folder}\modules\swagger-codegen-cli\target\swagger-codegen-cli.jar .

Then run command defined in ```generate.json```, example:

> java -jar swagger-codegen-cli.jar generate -i http://localhost:8000/swagger.json -l typescript-angular -o your-project-api-generated

optional parameters (***deprecated***):

> -c options.json

After follow ```your-project-api-generated``` README.md instructions.

## Or go to https://editor.swagger.io/ and generate client.

## Step 2 - Creating library

*Next steps follow the oficial guide : https://angular.io/guide/creating-libraries*

Run command:

> ng new your-project-api --create-application=false
>
> cd your-project-api
>
> ng generate library your-project-api

From ```your-project-api-generated``` copy all folders:
- ```model```
- ```service```
- ```configuration.ts```
- ```encoder.ts```
- ```your-project-api-generated.module.ts```
- ```variables.ts```

Pastle into ```your-project-api\projects\lib\src```.

## Step 3 - Publish API

Add follow rows into ```your-project-api\package.json```

    "scripts": {
        ...
        "build": "ng build your-project-api",
        "npm_pack": "cd dist/your-project-api && npm pack",
        "package": "npm run build && npm run npm_pack",
        ..
    },

Run npm command:

> npm run package

Go to Main Angular project and paste something like this:

> npm install {you-path}/your-project-api/your-project-api/dist/your-project-api.tgz