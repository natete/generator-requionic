/**
 *
 * Copyright (c) 2014 Hewlett-Packard.
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Hewlett-Packard, Inc.
 *
 * Source code style and conventions follow the "ISS Development Guide Java
 * Coding Conventions" standard dated 01/12/2011.
 */

/**
 * @param {type} angular
 * @returns {angular.module}
 * @author <%- author %>
 * @since <%= date %>
 */

(function() {

  define([
    'angular'
  ], function(ng) {
    'use strict';

    return ng.module('app.<%= module %>', []);
  });
})();
