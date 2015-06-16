install_ng_admin:
	git clone https://github.com/marmelab/ng-admin.git web/ng-admin
	cd web/ng-admin
	make install

tans_dump:
	app/console bazinga:js-translation:dump

db:
	app/console doctrine:database:create
	app/console doctrine:schema:create

fos_user:
	app/console fos:user:create admin admin@gmail.com 123456 --super-admin
	app/console fos:user:activate admin