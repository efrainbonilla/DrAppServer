var CrudModule = angular.module('crudApp', ['ng-admin']);

CrudModule.config(require('./list/ListActions'));

module.exports = CrudModule;