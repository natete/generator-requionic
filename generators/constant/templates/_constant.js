/**
 * @param {type} <%= moduleName %> module
 * @author <%- author %>
 * @since <%= date %>
 */

(function () {
    define(['./<%= moduleName %>.module'], function (moduleName) {
        'use strict';

        angular.module(moduleName)
            .constant(
            // Add your constants here
        );

    });
})();
