/**
 * Main module.
 * @param {type} angular
 * @author <%= author %>
 * @since <%= date %>
 */
(function () {
    define([
            'angular'// Yeoman hook. Define section. Do not remove this comment.
        ],
        function (angular) {
            'use strict';
            var module = angular.module('app.core', [
                // Yeoman hook. Dependencies section. Do not remove this comment.
            ]);

            module.config(Config);

            Config.$inject = ['$urlRouterProvider'];

            function Config($urlRouterProvider) {

                $urlRouterProvider.otherwise('/');
            }

            return module;
        });
})();
