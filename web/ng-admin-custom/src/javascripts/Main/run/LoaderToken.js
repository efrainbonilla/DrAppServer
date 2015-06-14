
define(function () {
	'use strict';

	var LoaderToken = function ($rootScope, store, jwtHelper, $location, $http, $urlRouter, progression, $modal) {
		var token = store.get('token') || null;
		if (token) {
			var bool =  jwtHelper.isTokenExpired(token);
			if (bool === false) {

				console.log(jwtHelper.decodeToken(token));

				$http.defaults.headers.common.Authorization = store.get('authorization');
			} else {
				store.remove('authorization');
				store.remove('token');
				delete $http.defaults.headers.common.Authorization;
				alert("token expired");
			}
		}

		var deniedTemplate = require('../view/layoutModalDenied.html');

		$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

			var route = toState.name;

			if ( route != undefined ) {

				var grated = {
					'create': true,
					'edit': true,
					'list': true,
					'show': true,
					'delete': true
				};
				if (route in grated) {

					var roles = {
						'create': true,
						'edit': true,
						'list': true,
						'show': true
					};

					if (route in roles && roles[route]) {
						console.log("acceso concedido");
					} else {
						/*event.defaultPrevented = true;*/
						event.preventDefault();
						$modal.open({
							template: deniedTemplate,
							/*templateUrl: 'denied.html',*/
							controller: 'ModalAccessDeniedDeCtrl',
							backdrop: 'static',
							keyboard: false
						});
						return;
					}
				}
			}
		});
	};

	LoaderToken.$inject = ['$rootScope', 'store', 'jwtHelper', '$location', '$http', '$urlRouter', 'progression', '$modal'];

	return LoaderToken;
});