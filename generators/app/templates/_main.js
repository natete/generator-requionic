/**
 * Main application required dependencies.
 * @author <%= author %>
 * @since <%= date %>
 */
(function () {
    require.config({
        paths: {
            angular: '../lib/ionic/js/ionic.bundle.min',
            text: '../lib/requirejs-text/text',
            ngCordova: '../lib/ngCordova/dist/ng-cordova',
        },
        shim: {
            angular: {
                exports: 'angular'
            },
            ngCordova: ['angular'],
        },
        priority: [
            'angular', 'ngCordova'
        ]
    });
    require([
        'angular',
        'app',
        'ngCordova'
    ], function (angular, appName, ngCordova) {
        'use strict';
        angular.module(appName)
            .run(function ($ionicPlatform) {
                $ionicPlatform.ready(function () {

                    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                    // for form inputs)
                    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                        cordova.plugins.Keyboard.disableScroll(true);

                    }

                    // Show app in normal screen with status bar
                    ionic.Platform.fullScreen(false, true);
                });
            });

        // bootstraps angular application. Use this instead of using ng-app
        angular.element().ready(function () {
            angular.bootstrap(document, ['app']);
        });
    });
})();
