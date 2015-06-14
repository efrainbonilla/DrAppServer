define(function () {
	'use strict';

	var ModalLoginController = function ($rootScope, $scope, $modalInstance, AuthenticationService) {
		$scope.credentials = {
			username: 'admin',
			password: '123456'
		};

		$scope.$on('event:auth-login-failed', function(even, data) {
			$scope.errorMessage = data.message ? 'status.'+ data.code : 'Bad credentials';
		});

		$scope.$on('event:auth-login-complete', function() {
			$modalInstance.close();
		});

		$scope.submit = function(credentials) {
			AuthenticationService.login(credentials);
		};

		$scope.cancel = function () {
			AuthenticationService.cancel();
		};
	};

	ModalLoginController.$inject = ['$rootScope', '$scope', '$modalInstance', 'AuthenticationService'];

	return ModalLoginController;
});