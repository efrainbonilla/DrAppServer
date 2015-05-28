

/*global angular*/
(function () {
	"use strict";

	var baseApiUrl = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/api/';

    var app = angular.module('myApp', [
    	'ng-admin',
    	'http-auth-interceptor',
    	'boxuk.translation',//symfony-translation
    	'angular-jwt',
    	'angular-storage'
    ]);

	function truncate (value) {
		if (!value) {
			return '';
		}
        return value.length > 50 ? value.substr(0, 50) + '...' : value;
	}


	app.config(function (RestangularProvider) {
		RestangularProvider.addFullRequestInterceptor(function (element, operation, what, url, headers, params) {
			console.log('RequestInterceptor: ', element, operation, what, url, headers);
			if (operation == "getList") {
				if (params._page) {
					params._start = (params._page - 1) * params._perPage;
                    params._end = params._page * params._perPage;

                    params.offset = params._start;
                    params.limit = params._end;

                    delete params._start;
					delete params._end;

				}
				delete params._page;
				delete params._perPage;

				if (params._sortField) {
					/*params._sort = params._sortField;*/
					/*params.sorting = new Array();


					var order_by = {};
					order_by[params._sortField] = params._sortDir;
					order_by['case_name'] = 'ASC';
					var order = [];
					order.push('[case_id]=ASC');
					order.push('[case_name]=DESC');

					params.sorting = order_by;*/

					delete params._sortDir;
					delete params._sortField;
				}

				if (params._filters) {
					for (var filter  in params._filters) {
						params[filter] = params._filters[filter];
					}
					delete params._filters;
				}
			}
			console.log("request params", params);
			return {
				params: params
			};
		});

        RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response, deferred) {

            if (operation === 'getList' && what === 'casos') {

            	console.log(data, operation, what, response);
            	return data._embedded.items;
            }


            return data;
        })
	});

	var actions = [
		'<ma-edit-button entry="entry" entity="entity" label="{{ \'action.edit\' | trans }}" size="xs">' +
		'</ma-edit-button> ',
		'<ma-delete-button entry="entry" entity="entity" label="{{ \'action.delete\' | trans }}" size="xs">' +
		'</ma-delete-button> ',
		'<ma-show-button entry="entry" entity="entity" label="{{ \'action.show\' | trans }}" size="xs">' +
		'</ma-show-button> '
	];
	actions = [
		'<ma-edit-button entry="entry" entity="entity" label="{{ \'action.empty\' | trans }}" size="xs">' +
		'</ma-edit-button> ',
		'<ma-delete-button entry="entry" entity="entity" label="{{ \'action.empty\' | trans }}" size="xs">' +
		'</ma-delete-button> ',
		'<ma-show-button entry="entry" entity="entity" label="{{ \'action.empty\' | trans }}" size="xs">' +
		'</ma-show-button> '
	];

	app.config(function($provide, NgAdminConfigurationProvider, RestangularProvider) {
    	$provide.factory('CasoAdmin', function() {
    		var nga = NgAdminConfigurationProvider;
    		var caso = nga.entity('casos')
				.identifier(nga.field('case_id'));

			RestangularProvider.addElementTransformer('casos', function (element) {
				if (element.case_clin) {
					element.case_clin = element.case_clin.clin_id;
				}
				return element;
			});

    		caso.dashboardView()
    			.title('Casos recientes')
				.fields([
					nga.field('case_title')
						.label('Caso')
				]);

			caso.listView()
                .title('Lista de casos')
				.infinitePagination(false)
				.perPage(10)
				.fields([
					nga.field('case_id').label('ID'),
					nga.field('case_title').label('Casos'),
				])
				.listActions(actions);

			caso.creationView()
				.title('Crear nuevo caso')
				.description('Casos de salud')
				.fields([
					nga.field('case_title').label('Titulo de caso'),
					nga.field('case_content', 'wysiwyg').label('Descripción'),
					nga.field('case_status', 'choice')
						.label('Estatus')
                        .choices([
                          { value: 'publish', label: 'Publicado' },
                          { value: 'draft', label: 'Borrador' },
                        ]),
					nga.field('comment_status', 'choice')
						.label('Estatus de comentario')
						.choices([
							{ value: 'open', label: 'Abierto' },
							{ value: 'close', label: 'Cerrado' },
						]),
					nga.field('access_control', 'choice')
						.label('Control de acceso')
						.choices([
							{ value: 'all', label: "Todo" }
						]),

					nga.field('case_clin', 'reference')
						.label('Clinica')
						.targetEntity(nga.entity('clinicas')
							.baseApiUrl(baseApiUrl)
							.identifier(nga.field('clin_id')))
						.targetField(nga.field('clin_name')),

				]);

			caso.editionView()
				.fields([
					caso.creationView().fields(),
				]);

			caso.showView()
				.fields([
					caso.creationView().fields(),
				]);


			return caso;
    	});
    });

	app.config(function($provide, NgAdminConfigurationProvider, RestangularProvider) {
		$provide.factory('ClinicaAdmin', function(){
			var nga = NgAdminConfigurationProvider;
    		var clinica = nga.entity('clinicas')
				.identifier(nga.field('clin_id'));

			RestangularProvider.addElementTransformer('clinicas', function (element) {
				if (element.clin_lat && element.clin_lng) {
					element.clin_lat = parseInt(element.clin_lat);
					element.clin_lng = parseInt(element.clin_lng);
				}
				return element;
			});

			clinica.dashboardView()
    			.title('Clinicas')
				.fields([
					nga.field('clin_name')
						.label('Nombre')
				]);

			clinica.listView()
				.infinitePagination(true)
				.fields([
					nga.field('clin_id').label('ID'),
					nga.field('clin_name').label('Nombre'),
				])
				.listActions(actions);

			clinica.creationView()
				.fields([
					nga.field('clin_name').label('Nombre'),
					nga.field('clin_addr').label('Dirección'),
					nga.field('clin_lat', 'number').label('Coordenada Latitud'),
					nga.field('clin_lng', 'number').label('Coordenada Longitud'),
				]);

			clinica.editionView()
				.fields([
					clinica.creationView().fields(),
				]);

			clinica.showView()
				.fields([
					nga.field('clin_id').label('ID'),
					clinica.editionView().fields(),
				]);

			return clinica;
		});
	});

	app.config(function($provide, NgAdminConfigurationProvider) {
		$provide.factory('UserAdmin', function(){
			var nga = NgAdminConfigurationProvider;
			var user = nga.entity('users').label('Usuarios');

			user.dashboardView()
				.title('Usuarios')
				.fields([
					nga.field('username')
				]);

			user.listView()
				.title('Lista de usuarios')
				.infinitePagination(false)
				.fields([
					nga.field('id'),
					nga.field('username').label('Nombre de usuario'),
					nga.field('email').label('Correo electronico'),
					nga.field('enabled', 'boolean'),
				])
				.listActions(actions);

			user.creationView()
				.title('Crear nuevo usuario')
				.fields([
					nga.field('username')
						.attributes({ 'placeholder':'Usuario'}),
					nga.field('email', 'email')
						.attributes({ 'placeholder':' Correo de electronico'}),
					nga.field('password', 'password')
						.attributes({ 'placeholder':' Contraseña'}),

					/*nga.field('roles')
						.simpleApiCall(function (argument) {
							return {};
						})*/

				]);

			user.editionView()
				.title("{{ 'profile.edit.submit' | trans }} # {{ entry.values.id }}")
				.fields([
					nga.field('username').label('Nombre de usuario'),
					nga.field('email', 'email').label('Dirección de correo electrónico'),

					nga.field('enabled', 'boolean').label('Estado')
				]);

			user.showView()
				.fields([
					nga.field('id'),
					nga.field('username'),
					nga.field('email'),
					nga.field('created_at', 'datetime'),
					nga.field('update_at', 'datetime'),
					nga.field('enabled'),
					nga.field('locked'),
					nga.field('last_login', 'datetime'),
				]);

			return user;
		});
	});

	/*services*/
    app.config(function($provide) {
    	$provide.factory('AuthenticationService', function($rootScope, $http, authService, $httpBackend, store ){
    		return {
    			login: function (credentials) {
					$http
					.post('/api/login_check', credentials, {
						ignoreAuthModule: true
					})
					.success(function(data, status, headers, config) {

						store.set('token',  data.token);
						store.set('authorization', 'Bearer ' + data.token );

						$http.defaults.headers.common.Authorization = store.get('authorization'); //step 1
						authService.loginConfirmed(data, function(config) { // step2 & 3

							config.headers.Authorization = store.get('authorization');
							$rootScope.$broadcast('event:auth-login-complete');
							return config;
						});
					})
					.error(function(data, status, headers, config) {
						$rootScope.$broadcast('event:auth-login-failed', data, status);
					});
    			},
    			logout: function (user) {
					delete $http.defaults.headers.common.Authorization;
					store.remove('token');
					store.remove('authorization');

					$rootScope.$broadcast('event:auth-logout-complete');
    			},
    			cancel: function () {
    				authService.loginCancelled();
    			}
    		};
    	});

    	$provide.service('UserService', function(){
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
    	});
    });
	/*controller*/
	app.controller('AppCtrl', ['$scope', '$modal', 'store', 'jwtHelper', AppCtrl])
	.controller('ModalInstanceCtrl', function($rootScope, $scope, $modalInstance, AuthenticationService) {

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


	})
	.controller('ModalLogoutCtrl', function ($scope, $modalInstance, AuthenticationService){

		$scope.ok = function () {
			$modalInstance.close();
			AuthenticationService.logout({});

		};
		$scope.cancel = function () {
			$modalInstance.close();
		};

		console.log($scope.$id);
	});


	function AppCtrl($scope, $modal, store, jwtHelper){

		$scope.$on('event:auth-loginRequired', function (rejection) {

			$modal.open({
				templateUrl: 'login.html',
				controller: 'ModalInstanceCtrl',
				backdrop: 'static',
				keyboard: false
			});
      	});

		$scope.loginCheck = function () {

			var token = store.get('token') || null;
			if (!token) {
				return false;
			}

			var bool = jwtHelper.isTokenExpired(token);
			if (bool === true) {
				return false;
			}

			return true;
		};


		$scope.logoutConfirm = function() {
			$modal.open({
				templateUrl: 'logout.html',
				controller: 'ModalLogoutCtrl',
				backdrop: 'static',
				keyboard: false
			});
		};

      	$scope.$on('event:auth-forbidden', function () {
		});
	}


    app.config(function($stateProvider) {
         var customPageTemplate = '<div class="row"><div class="col-lg-12">' +
            '<ma-view-actions><ma-back-button></ma-back-button></ma-view-actions>' +
            '<div class="page-header">' +
                '<h1>Stats</h1>' +
                '<p class="lead">You can add custom pages, too</p>' +
            '</div>' +
        '</div></div>';

        $stateProvider.state('stats', {
            parent: 'main',
            url: '/stats',
            template: customPageTemplate
        });
    });


	app.config(function(
		NgAdminConfigurationProvider,
		CasoAdminProvider,
		ClinicaAdminProvider,
		UserAdminProvider ) {

		var admin = NgAdminConfigurationProvider
			.application('Dr App')
            .baseApiUrl(baseApiUrl),
            nga = NgAdminConfigurationProvider;


		admin
 			.addEntity(CasoAdminProvider.$get())
 			.addEntity(ClinicaAdminProvider.$get())
 			.addEntity(UserAdminProvider.$get())
		;

        /*admin.menu(
            nga.menu()
                .addChild(nga.menu(nga.entity('posts')).title('Entradas'))
                .addChild(nga.menu(nga.entity('comments')))
                .addChild(nga.menu(nga.entity('tags')))
                .addChild(
                    nga.menu()
                        .title('Otros')
                        .addChild(
                            nga.menu()
                                .title('Stats')
                                .icon('<span class="glyphicon glyphicon-file"></span>')
                                .link('/stats')
                        )
                )
        );*/

		var customHeaderTemplate=
		'<div class="navbar-header">' +
            '<a class="navbar-brand" href="#" ng-click="appController.displayHome()">{{ ::appController.applicationName }}</a>' +
        '</div>' +
        '<ul ng-controller="DropdownCtrl" class="nav navbar-top-links navbar-right">'+
			'<li class="dropdown" ng-if="loginCheck()" dropdown on-toggle="toggled(open)">'+
				'<a href="#" class="dropdown-toggle" dropdown-toggle data-toggle="dropdown"> <i class="fa fa-user fa-fw"></i> <i class="fa fa-caret-down"></i> </a>'+
				'<ul class="dropdown-menu dropdown-user">'+
					'<li ng-repeat="choice in items"><a href="#"> <i class="{{choice.icon_fa}}"></i>{{choice.text}}</a></li>'+
					'<li class="divider"></li>'+
					'<li><a href="#"> <i class="fa fa-gear fa-fw"></i>Configuración</a></li>'+
					'<li ng-click="logoutConfirm()"><a href="#"> <i class="fa fa-sign-out fa-fw"></i>Salir</a></li>'+
				'</ul>'+
			'</li>'+
		'</ul>';

        admin.header(customHeaderTemplate);


        var customDeleteViewTemplate=
        '<div class="row">'+
		    '<div class="col-lg-12">'+
		        '<ma-view-actions override="::deleteController.actions" entry="::entry" entity="::deleteController.entity">'+
		            '<ma-list-button ng-if="::entity.listView().enabled" label="{{ \'action.list\' | trans }}" entity="::entity"></ma-list-button>'+
		        '</ma-view-actions>'+
		        '<div class="page-header">'+
		            '<h1 compile="::deleteController.title">'+
		                '{{\'action.delete\' | trans }} {{ ::deleteController.view.entity.name() | humanize:true | singularize }}  #{{ ::entry.identifierValue }} {{ ::deleteController.entityId }}'+
		            '</h1>'+
		            '<p class="lead" ng-if="::deleteController.description" compile="::deleteController.description">{{ ::deleteController.description }}</p>'+
		        '</div>'+
		    '</div>'+
		'</div>'+
		'<div class="row" id="delete-view">'+
		    '<div class="col-lg-12">'+
		        '<p>{{ \'delete_modal.title\' | trans }}</p>'+
		        '<button class="btn btn-danger" ng-click="deleteController.deleteOne()">SI</button> '+
		        '<button class="btn btn-default" ng-click="deleteController.back()">NO</button>'+
		    '</div>'+
		'</div>';

		var customEditViewTemplate=
		'<div class="row">'+
		    '<div class="col-lg-12">'+
		        '<ma-view-actions override="::formController.actions" entry="entry" entity="::formController.entity">'+
		            '<ma-list-button ng-if="::entity.listView().enabled" label="{{ \'action.list\' | trans }}" entity="::entity"></ma-list-button> '+
		            '<ma-delete-button ng-if="::entity.deletionView().enabled" label="{{ \'action.delete\' | trans }}" entry="entry" entity="::entity"></ma-delete-button>'+
		        '</ma-view-actions>'+
		        '<div class="page-header">'+
		            '<h1 compile="::formController.title">'+
		                '{{ \'action.edit\' | trans }} {{ ::formController.entity.name() | humanize:true | singularize }}  #{{ ::entry.identifierValue }}'+
		            '</h1>'+
		            '<p class="lead" ng-if="::formController.description" compile="::formController.description">{{ ::formController.description }}</p>'+
		        '</div>'+
		    '</div>'+
		'</div>'+
		'<div class="row" id="edit-view" ng-class="::\'ng-admin-entity-\' + formController.entity.name()">'+
		    '<form class="col-lg-12 form-horizontal" name="formController.form" ng-submit="formController.submitEdition($event)">'+
		        '<div class="form-field form-group" ng-repeat="field in ::formController.fields track by $index">'+
		            '<ma-field field="::field" entry="entry" entity="::entity" form="formController.form" datastore="::formController.dataStore"></ma-field>'+
		        '</div>'+
		        '<div class="form-group">'+
		            '<div class="col-sm-offset-2 col-sm-10">'+
		                '<button type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-ok"></span> {{ \'action.save\' | trans }}</button>'+
		            '</div>'+
		        '</div>'+
		    '</form>'+
		'</div>';

		var customListViewTemplate=
		'<div class="row list-header">'+
		    '<div class="col-lg-12">'+
		        '<ma-view-actions override="::listController.actions" selection="listController.selection" batch-buttons="::listController.batchActions" entity="::listController.entity" datastore="::listController.dataStore">'+
		            '<ma-view-batch-actions buttons="::batchButtons()" label="{{ \'action.delete\' | trans }}" selection="selection" entity="::entity"></ma-view-batch-actions> '+
		            '<ma-create-button ng-if="::entity.creationView().enabled" label="{{ \'action.new\' | trans: {\'entity_name\': \' \'} }}" entity="::entity"></ma-create-button> '+
		            '<ma-export-to-csv-button label="{{ \'action.export\' | trans }}" entity="::entity" datastore="::datastore"></ma-export-to-csv-button> '+
		        '</ma-view-actions>'+
		        '<div class="page-header">'+
		            '<h1 compile="::listController.title">'+
		                '{{ ::listController.view.entity.name() | humanize | pluralize }} list'+
		            '</h1>'+
		            '<p class="lead" ng-if="::listController.description" compile="::listController.description">{{ ::listController.description }}</p>'+
		        '</div>'+
		        '<ma-filter ng-if="listController.hasFilters" filters="::listController.filters" datastore="::listController.dataStore"></ma-filter>'+
		    '</div>'+
		'</div>'+
		'<div class="row list-view" ng-class="::\'ng-admin-entity-\' + listController.entity.name()">'+
		    '<div class="col-lg-12">'+
		        '<ma-datagrid name="{{ ::listController.view.name() }}" '+
		                  'entries="listController.dataStore.getEntries(listController.entity.uniqueId)" '+
		                  'selection="listController.selection" '+
		                  'fields="::listController.fields" '+
		                  'list-actions="::listController.listActions" '+
		                  'entity="::listController.entity" '+
		                  'sort-field="::listController.sortField" '+
		                  'sort-dir="::listController.sortDir">'+
		        '</ma-datagrid>'+
		    '</div>'+
		'</div>'+
		'<div class="row" ng-if="::!listController.infinitePagination">'+
		    '<div class="col-lg-12">'+
		        '<ma-datagrid-pagination '+
		            'page="{{ listController.page }}" '+
		            'per-page="{{ ::listController.view.perPage() }}" '+
		            'total-items="{{ listController.totalItems }}" '+
		            'set-page="::listController.setPageCallback"> '+
		        '</ma-datagrid-pagination>'+
		    '</div>'+
		'</div> '+
		'<ma-datagrid-infinite-pagination ng-if="::listController.infinitePagination" '+
		            'per-page="{{ ::listController.view.perPage() }}" '+
		            'total-items="{{ ::listController.totalItems }}" '+
		            'next-page="::listController.nextPageCallback"> '+
		'</ma-datagrid-infinite-pagination>';

		var customShowViewTemplate=
		'<div class="row">'+
		    '<div class="col-lg-12">'+
		        '<ma-view-actions override="::showController.actions" entry="entry" entity="::showController.entity">'+
		            '<ma-list-button ng-if="::entity.listView().enabled" label="{{ \'action.list\' | trans }}" entity="::entity"></ma-list-button> '+
		            '<ma-edit-button ng-if="::entity.editionView().enabled" label="{{ \'action.edit\' | trans }}" entry="entry" entity="::entity"></ma-edit-button> '+
		            '<ma-delete-button ng-if="::entity.deletionView().enabled" label="{{ \'action.delete\' | trans }}" entry="entry" entity="::entity"></ma-delete-button> '+
		        '</ma-view-actions>'+
		        '<div class="page-header">'+
		            '<h1 compile="::showController.title">'+
		                '{{ \'action.detail\' | trans }} {{ ::showController.view.entity.name() | humanize:true | singularize }}  #{{ ::entry.identifierValue }} '+
		            '</h1>'+
		            '<p class="lead" ng-if="::showController.description" compile="::showController.description">{{ ::showController.description }}</p>'+
		        '</div>'+
		    '</div>'+
		'</div>'+
		'<div class="row form-horizontal" id="show-view">'+
		    '<div class="col-lg-12 form-group" ng-repeat="field in ::showController.fields track by $index">'+
		        '<label class="col-sm-2 control-label">{{ field.label() }}</label>'+
		        '<div class="show-value" ng-class="::\'ng-admin-field-\' + field.name() + ' + ' + (field.getCssClasses(entry) || \'col-sm-10 col-md-8 col-lg-7\')">'+
		            '<ma-column field="::field" entry="::entry" entity="::entity" datastore="::showController.dataStore"></ma-column>'+
		        '</div>'+
		    '</div>'+
		'</div>';

		var customCreateViewTemplate=
		'<div class="row">'+
		    '<div class="col-lg-12">'+
		        '<ma-view-actions override="::formController.actions" entry="entry" entity="::formController.entity">'+
		            '<ma-list-button ng-if="::entity.listView().enabled" label="{{ \'action.list\' | trans }}" entity="::entity"></ma-list-button> '+
		        '</ma-view-actions>'+
		        '<div class="page-header">'+
		            '<h1 compile="::formController.title">'+
		                'Create new {{ ::formController.view.entity.name() | humanize:true | singularize }}'+
		            '</h1>'+
		            '<p class="lead" ng-if="::formController.description" compile="::formController.description">{{ ::formController.description }}</p>'+
		        '</div>'+
		    '</div>'+
		'</div>'+
		'<div class="row" id="create-view" ng-class="::\'ng-admin-entity-\' + formController.entity.name()">'+
		    '<form class="col-lg-12 form-horizontal" name="formController.form" ng-submit="formController.submitCreation($event)">'+
		        '<div class="form-field form-group" ng-repeat="field in ::formController.fields track by $index">'+
		            '<ma-field field="::field" entry="entry" entity="::entity" form="formController.form" datastore="::formController.dataStore"></ma-field>'+
		        '</div>'+
		        '<div class="form-group">'+
		            '<div class="col-sm-offset-2 col-sm-10">'+
		                '<button type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-ok"></span> {{ \'action.submit\' | trans }}</button>'+
		            '</div>'+
		        '</div>'+
		    '</form>'+
		'</div>';


		var customTemplate = {
        	'DeleteView': customDeleteViewTemplate,
        	'EditView': customEditViewTemplate,
        	'ListView': customListViewTemplate,
        	'ShowView': customShowViewTemplate,
        	'CreateView': customCreateViewTemplate
        };

        admin.customTemplate(function (viewName) {
        	if (customTemplate[viewName]) return customTemplate[viewName];
        });

		NgAdminConfigurationProvider.configure(admin);
	});

	app.controller('DropdownCtrl', function($scope, $log){
		$scope.username = 'Efrain';
		$scope.items = [
			{ text: 'Perfil ' + $scope.username, icon_fa: 'fa fa-user fa-fw' }
		];


		$scope.status = {
			isopen: false
		};

		$scope.toggled = function(open) {
			$log.log('Dropdown is now: ', open);
		};

		$scope.toggleDropdown = function($event) {
			$event.preventDefault();
			$event.stopPropagation();
			$scope.status.isopen = !$scope.status.isopen;
		};
	});

	app.run(function ($rootScope, store, jwtHelper, $location, $http, $urlRouter, progression, $modal) {
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
						progression.done();

						$modal.open({
							templateUrl: 'denied.html',
							controller: 'ModalAccessDeniedDeCtrl',
							backdrop: 'static',
							keyboard: false
						});
						return;
					}
				}
			}
		});
	});

	app.controller('ModalAccessDeniedDeCtrl', function ($scope, $modalInstance, AuthenticationService){
		$scope.cancel = function () {
			$modalInstance.close();
		};

		console.log($scope.$id);
	});

}());
