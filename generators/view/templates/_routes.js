/**
 * Connect routes
 * @param {type} angular
 * @author <%= author %>
 * @since <%= date %>
 */

(function() {
  define(['./<%= moduleName %>.module', 'text!./<%= viewName %>.html'],
    function(module, template) {
      'use strict';
      module.config(config);

      config.$inject = ['$stateProvider', '$urlRouterProvider'];

      function config($stateProvider, $urlRouterProvider) {

        $stateProvider.state('<%= viewName %>', {
          url: '/<%= viewName %>',
          template: template,
          controller: '<%= controllerName %>',
          controllerAs: '<%= viewName + "Ctrl" %>'
        });

        // Yeoman hook. States section. Do not remove this comment.

        $urlRouterProvider.otherwise('/');
      }
    });
})();
