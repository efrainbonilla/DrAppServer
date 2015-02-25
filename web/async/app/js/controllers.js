'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('AppCtrl', ['$scope', '$modal', '$cookies',
    function($scope, $modal, $cookies) {

      $scope.$on('event:auth-loginRequired', function(rejection) {

        $modal.open({
          templateUrl: 'login.html',
          controller: 'ModalInstanceCtrl',
          backdrop: 'static'
        });

      });

    }
  ])

.controller('ModalInstanceCtrl', function($scope, $modalInstance, AuthenticationService) {

    $scope.credentials = {
      username: 'useradmin',
      password: 'admin'
    };

    $scope.$on('event:auth-login-failed', function(status) {
      $scope.errorMessage = 'Bad credentials ';
    });

    $scope.$on('event:auth-login-complete', function() {
      $modalInstance.close();
    });

    $scope.submit = function(credentials) {
      AuthenticationService.login(credentials);
    };

  })
  .controller('adminLoginCtrl', ['$scope', 'securityResource', '$state', 'UserService',
    function($scope, securityResource, $state, UserService) {
      var that = this;
      this.credentials = {};

      this.loginFailure = false;
      $scope.login = function(credentials) {
        alert("request");
        securityResource.save({
          action: 'login.json'
        }, {
          username: credentials.username,
          password: credentials.password
        }, function(response) {
          alert("response");
          UserService.setUser(response.data);
          $state.go('admin.main.dashboard');
        }, function(response) {
          if (response.status >= 400) {
            that.loginFailure = true;
          }
        });
      };
    }
  ])
  .controller('adminCtrl', ['securityResource', '$state', 'UserService',
    function(securityResource, $state, UserService) {
      this.user = null;
      var that = this;

      this.logout = function() {
        securityResource.save({
          action: 'logout.json'
        }, {}, function() {
          UserService.clear();
          $state.go('admin.login');
        });
      };

      this.initUser = function() {
        this.user = UserService.getUser();
        if (!that.user) {
          securityResource.save({
            action: 'loginCheck.json'
          }, {}, function(response) {
            that.user = response.user;
          }, function() {
            UserService.clear();
            $state.go('admin.login');
          });
        }
      };
    }
  ])
  .controller('MainCtrl', MainCtrl);

function MainCtrl($scope, $location, $http, ngTableParams, $log) {

  this.$http = $http;

  this.$log = $log;
  var oThis = this;


  // Default values, usually fetched from the url
  // to allow direct access to the filtered table
  var order_by = {
    case_title: 'asc'
  };
  var page = 1;
  var count = 10;

  // Setup and publish the table on the scope
  $scope.tableParams = new ngTableParams({
    page: page,
    count: count,
    sorting: order_by,
  }, {
    debugMode: true,
    total: 0,
    getData: function($defer, tableParams) {
      oThis.fetchCasos(oThis.createQuery(tableParams), tableParams, $defer);
    }
  });
}

/**
 * Create the query object we need to send to our API endpoint
 * from the table params.
 */
MainCtrl.prototype.createQuery = function(tableParams) {
  var query = {
    page: tableParams.page(),
    limit: tableParams.count()
  };

  // The orderBy is in the form ["+state", "-title"]
  // where '+' represents ascending and '-' descending
  // We need to convert it to the format accepted by our API
  angular.forEach(tableParams.orderBy(), function(dirColumn) {
    var key = 'sorting[' + dirColumn.slice(1) + ']';
    query[key] = (dirColumn[0] === '+') ? 'asc' : 'desc';
  });
  return query;
};

/**
 * Fetch the product list by sending the HTTP request to the products endpoint.
 */
MainCtrl.prototype.fetchCasos = function(query, tableParams, $defer) {

  this.$http({
      url: '/api/casos',
      method: 'GET',
      params: query,
      cache: false
    })
    .then(
      //Success callback
      function(response, status) {
        var data = response.data;
        var casos = data._embedded.items;

        //Establecer el numero total de casos
        tableParams.total(data.total);

        //Establecer el $defer con datos de casos en array
        $defer.resolve(casos);
      },
      //Error
      function(response, status) {
        //toast show message response.data.message

      },
      // Notify
      function(response, status) {}
    );
};