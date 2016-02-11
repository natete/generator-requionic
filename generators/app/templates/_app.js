/**
* Application structure bootstraping.
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
      var app = angular.module('app', [
        'ionic'// Yeoman hook. Dependencies section. Do not remove this comment.
      ]);

      app.config(Config);

      Config.$inject = ['$ionicConfigProvider'];

      function Config ($ionicConfigProvider) {
        // Configure the max pages to save in cache
        $ionicConfigProvider.views.maxCache(10);
      }

      return app;
    });
  })();
