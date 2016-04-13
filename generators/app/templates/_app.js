/**
 * Application structure bootstraping.
 * @param {type} angular
 * @author <%= author %>
 * @since <%= date %>
 */
(function () {
    define([
            'angular',
            './core/main',
            './widgets/main'// Yeoman hook. Define section. Do not remove this comment.
        ],
        function (angular) {
            'use strict';

            var moduleName = 'app';

            angular.module(moduleName, [
                'ionic',
                'app.core',
                'app.widgets'// Yeoman hook. Dependencies section. Do not remove this comment.
            ])

                .config(Config);

            Config.$inject = ['$ionicConfigProvider'];

            function Config($ionicConfigProvider) {
                // Configure the max pages to save in cache
                $ionicConfigProvider.views.maxCache(10);
            }

            return moduleName;

        });
})();
