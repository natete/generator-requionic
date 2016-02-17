/**
 * Language controller.
 * @param {type} angular
 * @author reqionic
 */
(function () {
  define(['./multilanguage.module'], function (module) {
    'use strict';

    /* @ngInject */
    config.$inject = ['$translateProvider'];
    function config($translateProvider) {
      $translateProvider.useSanitizeValueStrategy('sanitizeParameters').useStaticFilesLoader({
        prefix: 'js/widgets/multilanguage/translations/lang-',
        suffix: '.json'
      });
    }
    module.config(config);

    module.controller('LangsController', LangsController);

    /* @ngInject */
    LangsController.$inject = ['$translate'];
    function LangsController($translate) {
      var vm = this;

      /**
       * Change language file mapping file.
       * @param {string} langKey
       */
      vm.changeLanguage = function (langKey) {
        $translate.use(langKey);
      };
    }
  });

})();
