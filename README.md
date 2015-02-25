# App Doctor Consulta Online

Backend:

  * Service Symfony2 Restful

Frontend:

  * WebApp AngularJS
  * AppMobile Android

## Bundles construction Service Restful
    VoryxRESTGeneratorBundle
    FOSRestBundle
    JMSSerializerBundle
    NelmioCorsBundle
    NelmioApiDocBundle
    FOSUserBundle
    LexikJWTAuthenticationBundle

** Demonstration purpose only. Do not use directly in production. **

## Installation

### Dependencies

    composer install

## Running Tests

    bin/phpunit -c app

## AngularJS App

To run the demo app :

* install the assets using `npm install` in the web/async directory
* run the symfony application with a `app/console server:run`
* browse to `http://localhost:8000/async/app/index.html`
