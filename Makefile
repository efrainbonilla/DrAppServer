clear: cache_clear

postinstall: db_database_create db_schema_create fos_user_create translation_dump cache_clear ng_admin_install

postdeploy: db_schema_update fos_user cache_clear

db_schema_create:
	app/console doctrine:schema:create

db_schema_update:
	app/console doctrine:schema:update

db_schema_drop:
	app/console doctrine:schema:drop --force

db_database_create:
	app/console doctrine:database:create

fos_user_create:
	app/console fos:user:create admin admin@gmail.com 123456 --super-admin
	app/console fos:user:activate admin

translation_dump:
	app/console bazinga:js-translation:dump

cache_clear:
	app/console cache:clear

ng_admin_install:
	git clone https://github.com/marmelab/ng-admin.git web/ng-admin
