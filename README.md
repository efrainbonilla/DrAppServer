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

Installation
------------

Clone the project :

  git clone https://github.com/efrainbonilla/DrAppServer.git

Update packages :

  cd DrAppServers
  composer install

Create cache and logs folders :

  mkdir app/cache
  mkdir app/logs
  chmod -R 777 app/cache
  chmod -R 777 app/logs

Edit database credentials :

  gedit app/config/parameters.yml

Update schemas (FOSUserBundle) :

  php app/console doctrine:schema:create

Create and activate user :

  php app/console fos:user:create
  php app/console fos:user:activate

## Running Tests

    bin/phpunit -c app

## AngularJS App

To run the demo app :

* install the assets using `npm install` in the web/async directory
* run the symfony application with a `app/console server:run`
* browse to `http://localhost:8000/async/app/index.html`
