/**
 * @param {type} <%= moduleName %> module
 * @author <%- author %>
 * @since <%= date %>
 */

(function () {
    define(['./<%= moduleName %>.module'], function (moduleName) {
        'use strict';

        angular.module(moduleName)
            .controller('<%= serviceName %>', <%= serviceName %>);

        <%= serviceName %>.$inject = ['$log'];

        function <%= serviceName %> ($log) {
            var service = {};

            service.method = method;

            function method() {
                // TODO autogenerated method stub...
            }

            return service;
        }
    });
})();
