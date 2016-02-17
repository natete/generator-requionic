/**
 * Module main file to requier corresponding files.
 * @param {type} angular
 * @author <%= author %>
 */
(function() {
  define([
    // Here files modules internal files referencies.
    <%- components.map(function(component){
          return '\'./' + module + '.' + component + '\'';
        }).join(',\n')  %>
    // ...
  ], function() {});
})();
