# Temando Open API UI.

This project is a [Material Design](https://material.io/) themed [Open API UI](https://www.openapis.org/) built using [React](https://facebook.github.io/react/). It visualises Open API (Swagger) definitions such as Swagger.

It was inspired by the [Material Swagger UI](https://github.com/legendecas/material-swagger-ui) project.

## Install

```sh
$ git clone git@src.temando.io:developer-experience/temando-open-api-ui.git
$ cd temando-open-api-ui
$ npm install
```

## Usage

The following will start a webpack development server at [http://localhost:8100/](http://localhost:8100/).

```sh
$ npm run start
```
When running locally, app requires a `url` parameter that points to a valid Swagger file.

For example:
- To visualise Temando Platform API Swagger, turn off CORS on browser using a plugin (.e.g [Chrome ExtensionAllow-Control-Allow-Origin](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en)), and go to <http://localhost:8100/?url=http://canary-developers.temando.com.s3-website-us-east-1.amazonaws.com/definition-viewer/data/platform-swagger.json>. The CORS issue will go away once we work out a way to add CORS header to Amazon S3 (sth like [this docs](http://docs.aws.amazon.com/AmazonS3/latest/dev/cors.html), which doesn't seem to work at the moment).
- To visualise PetStore v2 Swagger, go to <http://localhost:8100/?url=http://petstore.swagger.io/v2/swagger.json>
