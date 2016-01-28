/**
*
* Copyright (c) 2014 Hewlett-Packard.
* All Rights Reserved.
*
* This software is the confidential and proprietary information of
* Hewlett-Packard, Inc.
*
* Source code style and conventions follow the "ISS Development Guide Java
* Coding Conventions" standard dated 01/12/2011.
*/

/**
* @param {type} Login module
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

      function(activate) {
        $log.debug('Activating ' + vm.class);
      }
    }
  });
})();
