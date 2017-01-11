# Temando Open API Visualiser.

This project is a Material Design themed Open API UI built on React. It visualises Open API files such as Swagger. It is inspired by [Material Swagger UI](https://github.com/legendecas/material-swagger-ui) project.

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

App can be accessed at http://localhost:8100 and by default displays Temando Platform API definition for testing purposes and to avoid CORS issues. This shouldn't be long term...

Additional Swagger files can be visualised by adding a `url` query parameter. For example, the [PetStore v2 Swagger](http://localhost:8100/?url=http://petstore.swagger.io/v2/swagger.json) can also be visualised.
