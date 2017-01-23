# Temando Open API UI.

This project is a [Material Design](https://material.io/) themed [Open API UI](https://www.openapis.org/) built using [React](https://facebook.github.io/react/). It visualises Open API (Swagger) definitions such as Swagger.

It was inspired by the [Material Swagger UI](https://github.com/legendecas/material-swagger-ui) project.

## Install

```sh
$ git clone git@github.com:temando/open-api-ui.git
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
- To visualise PetStore v2 Swagger, go to <http://localhost:8100/?url=http://petstore.swagger.io/v2/swagger.json>

Note that the response headers for a request to the swagger file must have [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) turned on. Otherwise the browser will throw a CORS error.
