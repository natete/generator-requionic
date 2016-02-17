/**
 * Multilanguage module
 * @param {type} angular
 * @returns {angular.module}
 * @author reqionic
 */

(function () {

  define([
    'angular',
    'ngRoute',
    'ngTranslate',
    'ngTranslateLoaderStaticFiles'
  ], function (ng) {
    'use strict';

    return ng.module('app.widgets.multilanguage', ['ngRoute', 'pascalprecht.translate']).run(run);

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


