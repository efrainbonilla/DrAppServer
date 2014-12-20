'use strict';

/* Resources */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.resources', [])
	.factory('securityResource', ['$resource', function($resource) {
		return $resource('/admin/api/:action', {
			action: '@action'
		}, {});
	}]);