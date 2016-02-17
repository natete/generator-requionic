/**
 * @param {type} <%= moduleName %> module
 * @author <%- author %>
 * @since <%= date %>
 */

(function() {
  define(['./<%= moduleName %>.module'], function(module) {
    'use strict';

    module.controller('<%= serviceName %>', <%= serviceName %>);

    <%= serviceName %>.$inject = ['$log'];

    function <%= serviceName %> ($log) {
      var service = {};

      service.method = method;

      function method() {
        // TODO autogeneratd method stub...
      }

      return service;
    }
  });
})();
