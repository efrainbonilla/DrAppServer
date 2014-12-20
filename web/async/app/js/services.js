'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular
  .module('myApp.services', [])
  .value('version', '0.1')
  .factory('AuthenticationService', function($rootScope, $http, authService, $httpBackend) {
    return {
      login: function(credentials) {
        $http
          .post('/api/login_check', credentials, {
            ignoreAuthModule: true
          })
          .success(function(data, status, headers, config) {

            $http.defaults.headers.common.Authorization = 'Bearer ' + data.token; //step 1
            authService.loginConfirmed(data, function(config) { // step2 & 3

              config.headers.Authorization = 'Bearer ' + data.token;
              $rootScope.$broadcast('event:auth-login-complete');
              return config;
            });
          })
          .error(function(data, status, headers, config) {
            $rootScope.$broadcast('event:auth-login-failed', status);
          });
      },
      logout: function(user) {
        delete $http.defaults.headers.Authorization;
        $rootScope.$broadcast('event:auth-logout-complete');
      }
    };
  });

angular
  .module('myApp.services')
  .service('UserService', [function() {

    this.user = null;

    this.getUser = function() {
      return this.user;
    };

    this.setUser = function(user) {
      this.user = user;
    };

    this.clear = function() {
      this.user = null;
    };
  }]);