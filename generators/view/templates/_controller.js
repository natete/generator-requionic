/**
 * @param {type} <%= moduleName %> module
 * @author <%- author %>
 * @since <%= date %>
 */

(function() {
  define(['./<%= moduleName %>.module'], function(module) {
    'use strict';

    module.controller('<%= controllerName %>', <%= controllerName %>);

    <%=controllerName %>.$inject = ['$log'];

    function <%= controllerName %> ($log) {
      var vm = this;
      vm.class = '<%= controllerName %>';

      activate();

      function activate() {
        $log.debug('Activating ' + vm.class);
      }
    }
  });
})();
