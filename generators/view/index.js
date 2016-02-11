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
        'Welcome to the solid ' + chalk.red('generator-reqionic:view') + ' generator!'
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
      );
    },

    createRoutes: function() {
      this.log(chalk.yellow('### Creating routes ###'));
      var destinationPath = 'www/js/' + this.moduleName + '/' + _.toLower(this.viewName) + '.routes.js';
      var controllerName = _.capitalize(this.viewName) + 'Controller';
      this.fs.copyTpl(
        this.templatePath('_routes.js'),
        this.destinationPath(destinationPath),{
          author: this.options.author,
          moduleName: this.moduleName,
          controllerName: controllerName,
          viewName: this.viewName,
          date: (new Date()).toDateString()
        }
      );
    },

    createSyles: function() {
      this.log(chalk.yellow('### Creating styles ###'));
      var destinationPath = 'scss/partials/' + _.toLower(this.viewName) + '.scss';
      this.fs.copyTpl(
        this.templatePath('_styles.scss'),
        this.destinationPath(destinationPath),{
          viewName: this.viewName,
        }
      );

      var appName = _.last(_.split(this.destinationRoot(), '/'));
      var viewName = this.viewName;
      this.fs.copy(
        'scss/' + appName + '.scss',
        this.destinationPath('scss/' + appName + '.scss'), {
          process: function(content) {
            var hook = '\/\/ Yeoman hook. Do not remove this comment.';
            var regEx = new RegExp(hook, 'g');
            var newContent = content.toString().replace(regEx, '@import "partials/' + viewName + '";\n' + hook);
            return newContent;
          }
        }
      )
    }
  },

  install: function () {
    // this.installDependencies();
  }
});
