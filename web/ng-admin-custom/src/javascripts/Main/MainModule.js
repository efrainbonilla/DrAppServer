
var MainModule = angular.module('mainMod', ['ng-admin', 'ui.router']);

MainModule.controller('AppCtrl', require('./component/controller/AppController'));
MainModule.controller('ModalLoginCtrl', require('./component/controller/ModalLoginController'));
MainModule.controller('ModalLogoutCtrl', require('./component/controller/ModalLogoutController'));
MainModule.controller('ModalAccessDeniedDeCtrl', require('./component/controller/ModalAccessDeniedController'));
MainModule.controller('SessionDropdownCtrl', require('./component/controller/SessionDropdownController'));

MainModule.factory('AuthenticationService', require('./component/factory/AuthenticationService'));

MainModule.controller('PageController', require('./component/controller/PageController'));
MainModule.controller('LoginController', require('./component/controller/LoginController'));
MainModule.controller('HomeController', require('./component/controller/HomeController'));


MainModule.config(require('./config/routing'));

MainModule.config(require('./component/factory/CasoAdmin'));
MainModule.config(require('./component/factory/ClinicaAdmin'));
MainModule.config(require('./component/factory/UserAdmin'));
MainModule.config(require('./config/InterceptorAdmin'));
MainModule.config(require('./config/ConfigAdmin'));

MainModule.provider('UserService', require('./component/service/UserService'));

MainModule.run(require('./run/LoaderToken'));