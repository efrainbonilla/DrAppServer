/*global define*/
define(function () {
	'use strict';

	var baseApiUrl = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/api/';

	function CasoAdmin ($provide, NgAdminConfigurationProvider, RestangularProvider) {
		$provide.factory('CasoAdmin', function(){

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
				.listActions(['edit', 'delete', 'show']);

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
	}

	CasoAdmin.$inject = ['$provide', 'NgAdminConfigurationProvider', 'RestangularProvider'];

	return CasoAdmin;
});