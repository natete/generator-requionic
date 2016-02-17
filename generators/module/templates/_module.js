/**
 * @param {type} angular
 * @returns {angular.module}
 * @author <%- author %>
 * @since <%= date %>
 */

(function() {

  define([
    'angular'
  ], function(ng) {
    'use strict';

    return ng.module('app.<%= module %>', []);
  });
})();
