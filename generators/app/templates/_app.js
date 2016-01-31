/**
* Application structure bootstraping.
* @param {type} angular
* @author <%= author %>
* @since <%= date %>
*/
(function () {
  define(['angular'], function (angular) {
    'use strict';
    var app = angular.module('app', ['ionic']);

    app.config(Config);

    Config.$inject = ['$ionicConfigProvider'];

    function Config ($ionicConfigProvider) {
      // Configure the max pages to save in cache
      $ionicConfigProvider.views.maxCache(10);
    }

    return app;
  });
})();
