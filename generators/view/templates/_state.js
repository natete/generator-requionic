$stateProvider.state('<%= viewName %>', {
          url: '/<%= viewName %>',
          template: template,
          controller: '<%= controllerName %>',
          controllerAs: '<%= viewName + "Ctrl" %>'
        });
        
