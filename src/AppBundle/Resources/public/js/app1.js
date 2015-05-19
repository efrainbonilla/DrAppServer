'use strict';


var bundlesApp = 'bundles/app/';
// Declare app level module which depends on filters, and services
angular.module('myApp', [
  //CORE
  'ngAnimate',
  'ngResource',
  'ngSanitize',

  //DEPENDENCIES
  'ngTouch',
  'ngCookies',
  /*'ui',*/
  'ui.utils',
  'ui.router',
  'ui.bootstrap',
  /*'angular-loading-bar',*/
  /*'angularFileUpload',*/
  /*'cgNotify',*/

  /*'ngRoute',*/
  'http-auth-interceptor',
  'ngTable',

  //DEPRECATED
  /* 'ui.bootstrap.datetimepicker', */
  /*'kendo.directives',*/

  //MY CODE
  'myApp.filters',
  'myApp.resources',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).

config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function($urlRouterProvider, $stateProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'home.html'
    });

    $stateProvider.state('projects', {
        url: '/projects',
        templateUrl: 'projects.html'
    });

    $stateProvider.state('services', {
        url: '/services',
        templateUrl: 'services.html'
    });

    $stateProvider.state('downloads', {
        url: '/downloads',
        templateUrl: 'downloads.html'
    });

    $stateProvider.state('about', {
        url: '/about',
        templateUrl: 'about.html'
    });

    $stateProvider.state('contact', {
        url: '/contact',
        templateUrl: 'contact.html'
    });
    /*$locationProvider.html5Mode(true).hashPrefix('index.html');*/
  }
]);

/*angular.module("myApp", []).config(function($interpolateProvider){
    $interpolateProvider.startSymbol("{[{").endSymbol("}]}");
  });*/