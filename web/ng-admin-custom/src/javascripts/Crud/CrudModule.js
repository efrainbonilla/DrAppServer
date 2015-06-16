var CrudModule = angular.module('crudMod', ['ng-admin']);

CrudModule.config(require('./list/ListActions'));

module.exports = CrudModule;