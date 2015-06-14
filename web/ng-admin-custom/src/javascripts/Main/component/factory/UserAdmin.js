/*global define*/
define(function () {
	'use strict';

	function UserAdmin ($provide, NgAdminConfigurationProvider) {
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
				.listActions(['edit', 'delete', 'show']);

			user.creationView()
				.title('Crear nuevo usuario')
				.fields([
					nga.field('username')
						.attributes({ 'placeholder':'Usuario'}),
					nga.field('email', 'email')
						.attributes({ 'placeholder':' Correo de electronico'}),
					nga.field('password', 'password')
						.attributes({ 'placeholder':' Contraseña'})
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
	}

	UserAdmin.$inject = ['$provide', 'NgAdminConfigurationProvider'];

	return UserAdmin;
});