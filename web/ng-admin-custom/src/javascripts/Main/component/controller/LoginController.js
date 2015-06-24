/*global define*/

define(function () {
	'use strict';

	var LoginController = function ($scope, $state, AuthenticationService, progression) {

		this.$scope = $scope;
		this.$state = $state;
        this.progression = progression;

		$scope.credentials = {
			username: 'admin',
			password: '123456'
		};

		$scope.$on('event:auth-login-failed', function(even, data) {
            progression.done();
			$scope.errorMessage = data.message ? 'status.'+ data.code : 'Bad credentials';
		});

		$scope.$on('event:auth-login-complete', function() {
			$state.go($state.get('dashboard'));
            progression.done();
		});

		$scope.submit = function(credentials) {
        	progression.start();
			AuthenticationService.login(credentials);
		};

		$scope.cancel = function () {
			AuthenticationService.cancel();
		};

		$scope.$on('$destroy', this.destroy.bind(this));
	};

	LoginController.prototype.destroy = function () {
		this.$scope = undefined;
		this.$state = undefined;
	};

	LoginController.$inject = ['$scope', '$state', 'AuthenticationService', 'progression'];

	return LoginController;
});