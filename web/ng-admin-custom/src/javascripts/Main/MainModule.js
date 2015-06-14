
var MainModule = angular.module('mainApp', ['ng-admin']);

MainModule.controller('AppCtrl', require('./component/controller/AppController'));
MainModule.controller('ModalLoginCtrl', require('./component/controller/ModalLoginController'));
MainModule.controller('ModalLogoutCtrl', require('./component/controller/ModalLogoutController'));
MainModule.controller('ModalAccessDeniedDeCtrl', require('./component/controller/ModalAccessDeniedController'));

MainModule.factory('AuthenticationService', require('./component/factory/AuthenticationService'));

MainModule.config(require('./component/factory/CasoAdmin'));
MainModule.config(require('./component/factory/ClinicaAdmin'));
MainModule.config(require('./component/factory/UserAdmin'));
MainModule.config(require('./config/InterceptorAdmin'));
MainModule.config(require('./config/ConfigAdmin'));

MainModule.provider('UserService', require('./component/service/UserService'));

MainModule.run(require('./run/LoaderToken'));