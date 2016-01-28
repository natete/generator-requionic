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
