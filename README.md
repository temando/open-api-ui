# Temando Open API UI.

[![Travis CI](https://img.shields.io/travis/temando/open-api-ui.svg)](https://travis-ci.org/temando/open-api-ui)
[![MIT License](https://img.shields.io/github/license/temando/open-api-ui.svg)](https://en.wikipedia.org/wiki/MIT_License)
[![Greenkeeper](https://badges.greenkeeper.io/temando/open-api-ui.svg)](https://greenkeeper.io/)
[![Github Forks](https://img.shields.io/github/forks/temando/open-api-ui.svg?style=social&label=Fork)](https://github.com/temando/open-api-ui/network)
[![Github Issues](https://img.shields.io/github/issues-raw/temando/open-api-ui.svg)](https://github.com/temando/open-api-ui/issues)

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

## Deploy to production

Run the following to generate the artifacts at `/dist`:

```sh
npm run build:dist
```

Deploy the files at `/dist` to your server.
