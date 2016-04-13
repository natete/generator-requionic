/**
 * Multilanguage module
 * @param {type} angular
 * @returns {angular.module}
 * @author requionic
 */

(function () {

    define([
        'angular',
        'ngRoute',
        'ngTranslate',
        'ngTranslateLoaderStaticFiles'
    ], function (ng) {
        'use strict';

        var moduleName = 'app.widgets.multilanguage';

        ng.module(moduleName, ['ngRoute', 'pascalprecht.translate'])
            .run(run);

        return moduleName;

        run.$inject = ['$translate'];

        /**
         * Run function on startup language mudules.
         * @param {type} $translate
         * @param {type} SAM_CONFIG
         * @returns {langs.module_L28.run}
         */
        function run($translate) {
            // default language
            var language = 'es';
            if (navigator && navigator.globalization) {
                navigator.globalization.getLocaleName(function (localeName) {
                    if (localeName && localeName.value) {
                        language = localeName.value.split('-')[0];

                        // TODO: Get supported languages dynamically reading translations files.
                        var supportedLanguages = ['en', 'es'];
                        if (supportedLanguages.indexOf(language) === -1) {
                            language = 'en';
                        }
                    }
                });
            }
            $translate.use(language);
        }

    });
})();
