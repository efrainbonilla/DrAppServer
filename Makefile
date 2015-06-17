install_ng_admin:
	git clone https://github.com/marmelab/ng-admin.git web/ng-admin

tans_dump:
	app/console bazinga:js-translation:dump

db:
	app/console doctrine:database:create
	app/console doctrine:schema:create

fos_user:
	app/console fos:user:create admin admin@gmail.com 123456 --super-admin
	app/console fos:user:activate admin

clear:
	app/console cache:clear

postinstall:
	db
	fos_user
	install_ng_admin
	tans_dump
	clear

postdeploy:
	app/console doctrine:schema:create
	fos_user
	clear
	install_ng_admin
	clear