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
 * Search.
 * @param {type} angular
 * @author <%= author %>
 */
(function () {
  define([
        // Here files modules internal files referencies.
        <%- components.map(function(component){
          return '\'./' + module + '.' + component + '\'';
        }).join(',\n')  %>
      // ...
  ], function () {
  });
})();
