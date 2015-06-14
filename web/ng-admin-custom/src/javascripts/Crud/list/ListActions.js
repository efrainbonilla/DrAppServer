/*global define*/
define(function () {
    'use strict';

    var listActionsTemplate = require('./ListActions.html');

    function ListActionsDirective ($provide, NgAdminConfigurationProvider) {

        $provide.decorator('listActionsDirective', ['$delegate', function ($delegate) {

            $delegate[0].template = listActionsTemplate;

            return $delegate;
        }]);
    }

    ListActionsDirective.$inject = ['$provide', 'NgAdminConfigurationProvider'];

    return ListActionsDirective;
});