/*global define*/
define(function () {
	'use strict';

	var baseApiUrl = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/api/';

	var customHeaderTemplate = require('../view/layoutNavbar.html');
    var customDeleteViewTemplate = require('../../Crud/delete/delete.html');
	var customEditViewTemplate = require('../../Crud/form/edit.html');
	var customListViewTemplate = require('../../Crud/list/list.html');
	var customShowViewTemplate = require('../../Crud/show/show.html');
	var customCreateViewTemplate = require('../../Crud/form/create.html');

	function ConfigAdmin ( NgAdminConfigurationProvider,
		CasoAdminProvider,
		ClinicaAdminProvider,
		UserAdminProvider ) {



		var admin = NgAdminConfigurationProvider
		.application('Dr App')
        .baseApiUrl(baseApiUrl);


		admin
			.addEntity(CasoAdminProvider.$get())
			.addEntity(ClinicaAdminProvider.$get())
			.addEntity(UserAdminProvider.$get())
		;

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

	    admin.header(customHeaderTemplate);

		NgAdminConfigurationProvider.configure(admin);
	}

	ConfigAdmin.$inject = ['NgAdminConfigurationProvider', 'CasoAdminProvider', 'ClinicaAdminProvider', 'UserAdminProvider'];

	return ConfigAdmin;
});