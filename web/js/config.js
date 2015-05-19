/*global angular*/
(function () {
	"use strict";

	var baseApiUrl = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/api/';

    var app = angular.module('myApp', [
    	'ng-admin',
    	'http-auth-interceptor'
    ]);

	function truncate (value) {
		if (!value) {
			return '';
		}
        return value.length > 50 ? value.substr(0, 50) + '...' : value;
	}

	app.config(function($interpolateProvider){
	    $interpolateProvider.startSymbol('{{').endSymbol('}}');
	});

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
				params: params,
				url: url+'&sorting[case_name]=ASC&sorting[case_id]=DESC',
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

	app.config(function($provide, NgAdminConfigurationProvider) {
		$provide.factory('PostAdmin', function(){
			var nga = NgAdminConfigurationProvider;
			var post = nga.entity('posts').label('Entradas');

			post.dashboardView()
				.title('Entradas recientes')
				.order(1)
				.perPage(5)
				.fields([
					nga.field('title')
                        .label('Titulo')
                        .isDetailLink(true)
                        .map(truncate)
				]);

			post.listView()
                /*.disable()*/
                .title("Toda las entradas")
                .description("Lista de entradas")
				.infinitePagination(false)
				.fields([
					nga.field('id').label('ID'),
					nga.field('title').label('Titulo').cssClasses(['bg-success']),
                    nga.field('published_at', 'date').label('Publicado'),
					nga.field('views', 'number').label('Visitas'),
					nga.field('tags', 'reference_many').label('Etiquetas')
						.targetEntity(nga.entity('tags'))
						.targetField(nga.field('name'))
                ])
                .listActions(['show', 'edit', 'delete']);

            var cities = [
                { country: 'FR', value: 'Paris', label: 'Paris' },
                { country: 'FR', value: 'Nancy', label: 'Nancy' },
                { country: 'US', value: 'NY', label: 'New York' },
                { country: 'US', value: 'SF', label: 'San Francisco' }
            ]

            post.creationView()
                .title("Nueva entrada")
                .fields([
                    nga.field('title')
                        .label("Titulo")
                        .attributes({placeholder: 'Titulo de Entrada'})
                        .validation({required: true, minlength: 3, maxlength: 100}),
                    nga.field('teaser', 'text'),
                    nga.field('body', 'wysiwyg'),
                    nga.field('published_at', 'date'),

                    nga.field('country', 'choice')
                        .choices([
                          { value: 'FR', label: 'France' },
                          { value: 'US', label: 'USA' },
                        ]),
                    nga.field('city', 'choice')
                        .choices(function(entry) {
                            return cities.filter(function (city) {
                                return city.country === entry.values.country
                            });
                        })
				]);

			post.editionView()
				.title('Editar Entrada "{{ entry.values.title }}"')
				.actions(['list', 'show', 'delete'])
				.fields([
					post.creationView().fields(),
					nga.field('tags', 'reference_many')
						.targetEntity(nga.entity('tags'))
						.targetField(nga.field('name')),
                    nga.field('pictures', 'json'),
                    nga.field('views', 'number')
                        .cssClasses('col-sm-4'),
					nga.field('comments', 'referenced_list')
						.targetEntity(nga.entity('comments'))
						.targetReferenceField('post_id')
						.targetFields([
							nga.field('id'),
							nga.field('body').label('Comentario')
						]),
                    nga.field('', 'template')
                        .label('')
                        .template('<span class="pull-right"><ma-filtered-list-button entity-name="comments" filter="{ post_id: entry.values.id }" size="sm"></ma-filtered-list-button></span>')
				]);

			post.showView()
				.fields([
					nga.field('id'),
					post.editionView().fields(),
                    nga.field('custom_action', 'template')
                        .label('')
                        .template('<send-email post="entry"></send-email>')
				]);

			return post;
		});
	});

	app.config(function($provide, NgAdminConfigurationProvider) {
		$provide.factory('CommentAdmin', function() {
			var nga = NgAdminConfigurationProvider;
			var comment = nga.entity('comments').label('Comentarios');

			comment.dashboardView()
				.title('Últimos Comentarios')
				.order(2)
				.perPage(5)
				.fields([
					nga.field('id'),
					nga.field('body', 'wysiwyg')
						.label('Comentario')
						.stripTags(true)
						.map(truncate),
					nga.field(null, 'template')
						.label('')
						.template('<post-link entry="entry"></post-link>')
				]);

			comment.listView()
				.title('Comentarios')
				.perPage(10)
				.fields([
					nga.field('create_at', 'date')
						.label('Publicado')
						.order(1),
                    nga.field('body', 'wysiwyg')
                        .label('Mensaje')
                        .stripTags(true)
                        .map(truncate)
                        .order(3),
					nga.field('post_id', 'reference')
						.label('Entrada')
						.map(truncate)
						.targetEntity(nga.entity('posts'))
						.targetField(nga.field('title').map(truncate))
						.order(4),
					nga.field('author')
                        .label('Autor')
                        .order(2)
				])
				.filters([
					nga.field('q', 'string')
						.label('')
						.attributes({'placeholder': 'Busqueda general'}),
					nga.field('created_at', 'date')
						.label('Publicado')
						.attributes({'placeholder': 'Filtrar por fecha'}),
					nga.field('today', 'boolean').map(function() {
						var now = new Date(),
						year = now.getFullYear(),
						month = now.getMonth() + 1,
						day = now.getDate();

						month = month < 10 ? '0' + month : month;
						day = day < 10 ? '0' + day : day;

						return {
							create_at: [year, month, day].join('-')
						}
					}),
					nga.field('post_id', 'reference')
						.label('Entrada')
						.targetEntity(nga.entity('posts'))
						.targetField(nga.field('title'))
				])
				.listActions(['edit', 'delete']);

			comment.creationView()
				.fields([
					nga.field('created_at', 'date')
						.label('Publicado')
						.defaultValue(new Date()),
					nga.field('author'),
					nga.field('body', 'wysiwyg'),
					nga.field('post_id', 'reference')
						.label('Entrada')
						.map(truncate)
						.targetEntity(nga.entity('posts'))
						.targetField(nga.field('title'))
				]);

			comment.editionView()
				.fields(comment.creationView().fields())
				.fields([
					nga.field(null, 'template')
						.label('')
						.template('<post-link entry="entry"></post-link>')
				]);

			comment.deletionView()
				.title('Confirmación de eliminación');


			return comment;
		});
	});

	app.config(function($provide, NgAdminConfigurationProvider) {
		$provide.factory('TagAdmin', function(){
			var nga = NgAdminConfigurationProvider;
			var tag = nga.entity('tags').label('Etiquetas');

			tag.dashboardView()
				.title('Etiquetas recientes')
				.order(3)
				.perPage(10)
				.fields([
					nga.field('id'),
					nga.field('name').label('Nombre'),
					nga.field('published', 'boolean').label('Es publicado ?')
				]);

			tag.listView()
                .title('Lista de etiquetas')
				.infinitePagination(false)
				.fields([
					nga.field('id').label('ID'),
					nga.field('name').label('Nombre'),
					nga.field('published', 'boolean')
                        .label('Publicado')
                        .cssClasses(function(entry) {
						if (entry.values.published) {
							return 'bg-success text-center';
						}
						return 'bg-warning text-center';
					}),
					nga.field('custom', 'template')
						.label('Letras mayúsculas')
						.template('{{ entry.values.name.toUpperCase() }}')
				])
				.batchActions([])
				.listActions(['show']);

			tag.showView()
				.fields([
					nga.field('name'),
					nga.field('published', 'boolean')
				]);

			return tag;
		});
	});

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
				.fields([
					nga.field('case_id').label('ID'),
					nga.field('case_title').label('Casos'),
				])
				.listActions(['edit', 'delete', 'show']);

			caso.creationView()
				.title('Crear nuevo caso')
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
                .title('Lista de clinicas')
				.infinitePagination(false)
				.fields([
					nga.field('clin_id').label('ID'),
					nga.field('clin_name').label('Nombre'),
				])
				.listActions(['edit', 'delete', 'show']);

			clinica.creationView()
				.title('Crear nueva clinica')
				.fields([
					nga.field('clin_name').label('Nombre'),
					nga.field('clin_addr').label('Dirección'),
					nga.field('clin_lat', 'number').label('Coordenada Latitud'),
					nga.field('clin_lng', 'number').label('Coordenada Longitud'),
				]);

			clinica.editionView()
				.title('Editar clinica "{{ entry.values.clin_name }}"')
				.actions(['list', 'show', 'delete'])
				.fields([
					clinica.creationView().fields(),
				]);

			clinica.showView()
				.title('Clinica #{{ entry.values.clin_id }} Detalles')
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
			var user = nga.entity('users');

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
				.listActions(['edit', 'delete', 'show']);

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
				.title('Editar usuario # {{ entry.values.id }}')
				.fields([
					nga.field('username'),
					nga.field('email', 'email'),

					nga.field('enabled', 'boolean')
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
    	$provide.factory('AuthenticationService', function($rootScope, $http, authService, $httpBackend){
    		return {
    			login: function (credentials) {
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
						$rootScope.$broadcast('event:auth-login-failed', data, status);
					});
    			},
    			logout: function (user) {
					delete $http.defaults.headers.Authorization;
					$rootScope.$broadcast('event:auth-logout-complete');
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
	app.controller('AppCtrl', ['$scope', '$modal',
		function($scope, $modal){

		$scope.$on('event:auth-loginRequired', function(rejection) {

			$modal.open({
				templateUrl: 'login.html',
				controller: 'ModalInstanceCtrl',
				backdrop: 'static'
			});

      	});

	}])
	.controller('ModalInstanceCtrl', function($scope, $modalInstance, AuthenticationService) {

		$scope.credentials = {
			username: 'admin',
			password: '123456'
		};

		$scope.$on('event:auth-login-failed', function(even, data) {
			$scope.errorMessage = data.message ?  data.code + ': '+ data.message : 'Bad credentials';
		});

		$scope.$on('event:auth-login-complete', function() {
			$modalInstance.close();
		});

		$scope.submit = function(credentials) {
			AuthenticationService.login(credentials);
		};

	});






    app.directive('sendEmail', ['$location', function ($location) {
        return {
            restrict: 'E',
            scope: { post: '&' },
            template: '<a class="btn btn-default" ng-click="send()">Enviar entrada por correo electronico </a>',
            link: function (scope) {
                scope.send = function () {
                    $location.path('/sendPost/' + scope.post().values.id);
                };
            }
        };
    }]);

    app.config(function($stateProvider) {

        function sendPostController ($stateParams, notification) {
            this.postId = $stateParams.id;
            this.notification = notification;
        }
        sendPostController.inject = ['$stateParams', 'notification'];

        sendPostController.prototype.sendEmail = function() {
            if (this.email) {
                this.notification.log('Dirección de correo enviado exitosamente a ' + this.email, {addnCls: 'humane-flatty-success'});
            } else {
                this.notification.log('Dirección de correo no esta definido', {addnCls: 'humane-flatty-error'});
            }
        };

        var sendPostControllerTemplate = '<div class="row"><div class="col-lg-12">' +
                '<ma-view-actions><ma-back-button></ma-back-button></ma-view-actions>' +
                '<div class="page-header">' +
                '<h1>Enviar entrada #{{ controller.postId }} para dirección de correo.</h1>' +
                '</div>' +
                '</div></div>' +
                '<div class="row">' +
                '<div class="col-lg-5"><input type="text" size="10" ng-model="controller.email" class="form-control" placeholder="nombre@ejemplo.com"/></div>' +
                '<div class="col-lg-5"><a class="btn btn-default" ng-click="controller.sendEmail()">Enviar</a></div>' +
                '</div>';

        $stateProvider.state('send-post', {
            parent: 'main',
            url: '/sendPost/:id',
            params: { id: null },
            controller: sendPostController,
            controllerAs: 'controller',
            template: sendPostControllerTemplate
        });
    });

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
		/*PostAdminProvider,
		CommentAdminProvider,
		TagAdminProvider,*/
		CasoAdminProvider,
		ClinicaAdminProvider,
		UserAdminProvider ) {

		var admin = NgAdminConfigurationProvider
			.application('ng admin')
            .baseApiUrl('http://localhost:3000/'),
            nga = NgAdminConfigurationProvider;

		var baseApiUrl = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/api/';

		admin
			/*.addEntity(PostAdminProvider.$get())
			.addEntity(CommentAdminProvider.$get())
			.addEntity(TagAdminProvider.$get())*/

 			.addEntity(CasoAdminProvider.$get()
            			.baseApiUrl(baseApiUrl))
 			.addEntity(ClinicaAdminProvider.$get()
            			.baseApiUrl(baseApiUrl))
 			.addEntity(UserAdminProvider.$get()
            			.baseApiUrl(baseApiUrl))
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

		NgAdminConfigurationProvider.configure(admin);
	});
}());