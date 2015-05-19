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

    $stateProvider
    /**
     * admin
     */
    .state('admin', {
      url: '/admin',
      views: {
        main: {
          templateUrl: bundlesApp +'partials/admin.html',
          controller: function($scope) {
            alert("admin");
          }
        }
      }
    })

    /**
     * login
     */
    .state('admin.login', {
      url: '/login',
      views: {
        main: {
          templateUrl: bundlesApp +'partials/login.html',
          controller: 'adminLoginCtrl'
        }
      }
    })

    /**
     * admin main (base template)
     */
    .state('admin.main', {
      url: '/',
      views: {
        main: {
          templateUrl: bundlesApp +'partials/main.html',
          controller: function($scope) {
            alert("admin.main");
          },
          controllerAs: 'adminMain'
        }
      }
    })

    /**
     * admin main dashboard
     */
    .state('admin.main.dashboard', {
      url: 'dashboard',
      views: {
        main: {
         templateUrl: bundlesApp +'partials/dashboard/index.html',
          controller: function($scope) {
            alert("admin.main.dashboard");
          },
          controllerAs: 'adminMainDashboard'
        }
      }
    });

    $urlRouterProvider.otherwise('admin.main.dashboard');

    /*$locationProvider.html5Mode(true).hashPrefix('index.html');*/
  }
]);