/**
 * @param {type} angular
 * @returns {angular.module}
 * @author <%- author %>
 * @since <%= date %>
 */

(function () {

    define([
        'angular'
    ], function (ng) {
        'use strict';

        var moduleName = 'app.<%= module %>';

        ng.module(moduleName, []);

        return moduleName;
    });
})();
