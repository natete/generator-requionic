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
 * Connect routes
 * @param {type} angular
 * @author <%= author %>
 * @since <%= date %>
 */

(function () {
  define(['./<%= moduleName %>.module', 'text!./<%= viewName %>.html'], function (module, template) {
    'use strict';
    module.config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

      $stateProvider.state('<%= viewName %>', {
        url: '/<%= viewName %>',
        template: template,
        controller: '<%= controllerName %>',
        controllerAs: '<%= viewName + 'Ctrl' %>'
      });

      $urlRouterProvider.otherwise('/');
    }
  });
})();
