define(function () {
	'use strict';

	var ModalLogoutController = function ($scope, $modalInstance, AuthenticationService) {
		$scope.ok = function () {
			$modalInstance.close();
			AuthenticationService.logout({});

		};
		$scope.cancel = function () {
			$modalInstance.close();
		};

		console.log($scope.$id);
	};

	ModalLogoutController.$inject = ['$scope', '$modalInstance', 'AuthenticationService'];

	return ModalLogoutController;
});