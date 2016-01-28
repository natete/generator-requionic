'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');

module.exports = yeoman.generators.Base.extend({
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);

    this.argument('moduleName', {
      type: String,
      required: false
    });

    this.argument('viewName', {
      type: String,
      required: false
    });
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    if(!this.options.isSubCall) {
      this.log(yosay(
        'Welcome to the solid ' + chalk.red('generator-reqionic') + ' generator!'
      ));
    }

    var prompts = [];

    if(!this.moduleName) {
      var prompt = {
        type: 'input',
        name: 'moduleName',
        message: 'Module name: '
      }
      prompts.push(prompt);
    }

    if(!this.viewName) {
      var prompt = {
        type: 'input',
        name: 'viewName',
        message: 'View name: '
      }
    }

    if(prompts.length) {
      this.prompt(prompts, function (answers) {
        this.moduleName = this.moduleName || answers.moduleName;
        this.viewName = this.viewName || answers.viewName;

        done();
      }.bind(this));
    } else {
      done();
    }
  },

  writing: {
    createView: function () {
      this.log(chalk.yellow('### Creating view ###'));
      this.fs.copy(
        this.templatePath('_view.js'),
        this.destinationPath('www/js/' + this.moduleName + '/' + this.viewName + '.html')
      );
    },

    createController: function() {
      this.log(chalk.yellow('### Creating controller ###'));
      var destinationPath = 'www/js/' + this.moduleName + '/' + _.toLower(this.viewName) + '.controller.js';
      var controllerName = _.capitalize(this.viewName) + 'Controller';
      this.fs.copyTpl(
        this.templatePath('_controller.js'),
        this.destinationPath(destinationPath),{
          author: this.options.author,
          moduleName: this.moduleName,
          controllerName: controllerName,
          date: (new Date()).toDateString()
        }
      )
    }
  },

  install: function () {
    // this.installDependencies();
  }
});
