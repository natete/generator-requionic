'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var utils = require('../utils');
var _ = require('lodash');

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    this.argument('moduleName', {
      type: String,
      required: true
    });

  },

  prompting: function () {
    var done = this.async();
    var self = this;

    // Have Yeoman greet the user.
    if(!this.options.isSubCall) {
      self.log(yosay(
        'Welcome to the super-excellent ' + chalk.red('generator-reqionic') + ' generator!\n by'
      ));
      self.log(utils.greeting);
    }

    var prompts = [{
      type: 'input',
      name: 'author',
      message: 'Author name:',
      store: true
    }, {
      type: 'checkbox',
      name: 'componentsToBeCreated',
      message: 'Which components do you need to be created?',
      choices: [{
        name: 'Controller',
        value: 'controller'
      }, {
        name: 'Routes',
        value: 'routes'
      }, {
        name: 'Directive',
        value: 'directive'
      }, {
        name: 'Factory',
        value: 'factory'
      }, {
        name: 'Service',
        value: 'service'
      }]
    }];

    self.prompt(prompts, function (answers) {
      this.author = answers.author;
      this.componentsToBeCreated = answers.componentsToBeCreated;

      done();
    }.bind(this));
  },

  writing: {
    createMain: function () {
      var module = this.moduleName;
      var destinationPath = 'www/js/' + this.moduleName;
      this.log(chalk.yellow('### Creating main ###'));
      this.log(chalk.yellow('### Components: ' + JSON.stringify(this.componentsToBeCreated) + ' ###'));
      this.fs.copyTpl(
        this.templatePath('_main.js'),
        this.destinationPath(destinationPath + '/main.js'), {
          author: this.author,
          module: module,
          components: this.componentsToBeCreated
        }
      );
    },

    createModule: function() {
      this.log(chalk.yellow('### Creating module ' + this.moduleName + ' ###'));
        var destinationPath = 'www/js/' + this.moduleName;
        this.fs.copyTpl(
          this.templatePath('_module.js'),
          this.destinationPath(destinationPath + '/' + this.moduleName + '.module.js'), {
            author: this.author,
            module: this.moduleName,
            date: (new Date()).toDateString()
          }
        );
    }
  },

  callSubgenerators: function () {
    if(this.componentsToBeCreated.indexOf('controller') >= 0) {
      this.composeWith('reqionic:view', {
        arguments: [
          this.moduleName,
          this.moduleName
        ],
        options: {
          isSubCall: true,
          author: this.author
        }
      });
    }
  }
});
