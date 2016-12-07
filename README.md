# Temando Swagger Visualiser.

This project contains a UI visualisation of Swagger files. It is inspired by [Material Swagger UI](https://github.com/legendecas/material-swagger-ui) project.

## Install

```sh
$ git clone git@src.temando.io:developer-experience/documentation-ui.git
$ cd documentation-ui
$ npm install
```

## Usage

The following will start a webpack development server at [http://localhost:8100/](http://localhost:8100/).

```sh
$ npm run start
```

App can be accessed at http://localhost:8100.

By default the canonical [PetStore v2 Swagger](http://petstore.swagger.io/v2/swagger.json) is shown, but any Swagger file accessible by HTTP can be visualised by adding a `url` query parameter. For example, the [Temando API](http://localhost:8100/?url=sample-platform-swagger.json) can also be visualised.

This project includes a copy of the [Temando API Swagger](http://canary-library-of-alexandria.s3-website-us-east-1.amazonaws.com/definition-viewer/resources/swagger/sample-platform-swagger.js) for testing purposes and to avoid current CORS issues. This will not be the case long term!
