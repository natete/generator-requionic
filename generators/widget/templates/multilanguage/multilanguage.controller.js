/**
 * Language controller.
 * @param {type} angular
 * @author requionic
 */
(function () {
    define(['./multilanguage.module'], function (moduleName) {
        'use strict';

        angular.module(moduleName)
            .config(config)
            .controller('LangsController', LangsController);

        /* @ngInject */
        config.$inject = ['$translateProvider'];

        function config($translateProvider) {
            $translateProvider.useSanitizeValueStrategy('sanitizeParameters').useStaticFilesLoader({
                prefix: 'js/widgets/multilanguage/translations/lang-',
                suffix: '.json'
            });
        }

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
