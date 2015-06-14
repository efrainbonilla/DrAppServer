/*global define*/
define(function () {
	'use strict';

	function ClinicaAdmin ($provide, NgAdminConfigurationProvider, RestangularProvider) {
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
				.listActions(['edit', 'delete', 'show']);

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
	}

	ClinicaAdmin.$inject = ['$provide', 'NgAdminConfigurationProvider', 'RestangularProvider'];

	return ClinicaAdmin;
});