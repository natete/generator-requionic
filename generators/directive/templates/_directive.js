/**
 * @param {type} <%= moduleName %> module
 * @author <%- author %>
 * @since <%= date %>
 */

(function() {
  define(['./<%= moduleName %>.module'], function(module) {
    'use strict';

    module.directive('<%= directiveName %>', <%= directiveName %>);

    <%=controllerName %>.$inject = ['$log'];

    function <%= directiveName %> ($log) {
      var directive = {
        restrict: 'AE',
        link: link,
        controller: <%= controllerName %>,
        controllerAs: '<%= controllerAsName %>'
      }

      return directive;

      function link(scope, element, attrs) {

      }
    }
    });
    })();
