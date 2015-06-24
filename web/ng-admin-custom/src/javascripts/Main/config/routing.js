var layoutTemplate = require('../view/layout.html'),
	loginTemplate = require('../view/login.html'),
	registerTemplate = require('../view/register.html'),
	lostpasswordTemplate = require('../view/lostpassword.html'),
	homeTemplate = require('../view/home.html');

function routing ($stateProvider, $urlRouterProvider) {
	$stateProvider.state('page', {
		abstract: true,
		controller: 'PageController',
		controllerAs: 'appController',
		template: layoutTemplate
	});

	$stateProvider.state('login', {
		parent: 'page',
		url: '/login',
		controller: 'LoginController',
		controllerAs: 'loginController',
		template: loginTemplate
	});

	$stateProvider.state('register', {
		parent: 'page',
		url: '/register',
		controller: 'LoginController',
		controllerAs: 'loginController',
		template: registerTemplate
	});

	$stateProvider.state('lostpassword', {
		parent: 'page',
		url: '/lostpassword',
		controller: 'LoginController',
		controllerAs: 'loginController',
		template: lostpasswordTemplate
	});

	$stateProvider.state('home', {
		parent: 'page',
		url: '/home',
		controller: 'HomeController',
		controllerAs: 'homeController',
		template: homeTemplate
	});

	/*$urlRouterProvider.rule(function ($injector, $location) {
		var path = $location.path(),
		normalized = path.toLowerCase();
		if (path !== normalized) {
			return normalized;
		}
	});*/
}

routing.$inject = ['$stateProvider', '$urlRouterProvider'];

module.exports = routing;