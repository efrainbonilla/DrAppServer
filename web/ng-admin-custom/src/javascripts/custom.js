/*require('imports?this=>window!./../../../bundles/bazingajstranslation/js/translator.min.js');*/
require('./../../../js/translator.js');
require('./../../../js/translations/config.js');
var req = require.context("./../../../js/translations", true, /.*\/(es|en)\.js$/);

var transKeys = req.keys();
for (var i = 0; i < transKeys.length; i++) {
	__webpack_require__(req.resolve(transKeys[i]));
}

require('./Main/MainModule');
require('./Crud/CrudModule');

angular.module('myApp', [
	'mainMod', 'crudMod', 'ng-admin', 'http-auth-interceptor', 'boxuk.translation', 'angular-jwt', 'angular-storage'
]);