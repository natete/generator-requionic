'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var ejs = require('ejs');
var utils = require('../utils');
var interactionsHelper = require('../utils/interactionsHelper.js');

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    this.argument('viewName', {
      type: String,
      required: false
    });
  },
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    if (!this.options.isSubCall) {
      this.log(yosay(
        'Welcome to the solid ' + chalk.red('generator-requionic:view') +
        ' generator!'
        ));
    }

    var prompts = [];

    if (!this.viewName) {
      var prompt = {
        type: 'input',
        name: 'viewName',
        message: 'View name: '
      }
      prompts.push(prompt);
    }

    if (!this.options.moduleName) {
      var prompt = {
        type: 'input',
        name: 'moduleName',
        message: 'Module name: '
      }
      prompts.push(prompt);
    }

    if (!this.options.moduleType) {
      prompts.push(interactionsHelper.promptModuleType());
    }

    if (!this.options.author) {
      var prompt = {
        type: 'input',
        name: 'author',
        message: 'Author name: ',
        store: true
      }
      prompts.push(prompt);
    }

    if (prompts.length) {
      this.prompt(prompts, function (answers) {
        this.viewName = this.viewName || answers.viewName;
        //Normalize view input name.
        this.viewName = _.kebabCase(this.viewName);
        this.options.moduleName = this.options.moduleName || answers.moduleName;
        //Normalize module input name.
        this.options.moduleName = _.kebabCase(this.options.moduleName);
        this.options.moduleType = _.kebabCase(this.options.moduleType);
        this.options.author = this.options.author || answers.author;

        done();
      }.bind(this));
    } else {
      done();
    }
  },
  writing: {

    preprocessModule: function() {
        this.modulePath = 'www/js/' + this.options.moduleType + '/' + this.options.moduleName;
    },

    createView: function () {
      this.log(chalk.yellow('### Creating view ###'));
      var self = this;
      this.fs.copy(
        this.templatePath('_view.html'),
        this.destinationPath(this.modulePath + '/' + _.toLower(this.viewName) + '.html')
      );
    },
    createController: function () {
      this.log(chalk.yellow('### Creating controller ###'));
      var destinationPath = this.modulePath + '/' + _.toLower(this.viewName) + '.controller.js';
      var controllerName = _.capitalize(this.viewName) + 'Controller';
      this.fs.copyTpl(
        this.templatePath('_controller.js'),
        this.destinationPath(destinationPath), {
        author: this.options.author,
        moduleName: _.toLower(this.options.moduleName),
        controllerName: controllerName,
        date: (new Date()).toDateString()
      }
      );
    },
    createRoutes: function () {
      if (!this.fs.exists(this.modulePath + '/' + _.toLower(
        this.options.moduleName) + '.routes.js')) {
        this.log(chalk.yellow('### Creating routes ###'));
        var destinationPath = this.modulePath + '/' + _.toLower(this.options.moduleName) + '.routes.js';
        var controllerName = _.capitalize(this.viewName) + 'Controller';
        this.fs.copyTpl(
          this.templatePath('_routes.js'),
          this.destinationPath(destinationPath), {
          author: this.options.author,
          moduleName: _.toLower(this.options.moduleName),
          controllerName: controllerName,
          viewName: _.toLower(this.viewName),
          date: (new Date()).toDateString()
        }
        );
      } else {
        this.requiresEditRoutes = true;
      }
    },
    modifyRoutes: function () {
      if (this.requiresEditRoutes) {
        this.log(chalk.yellow('### Modifying routes ###'));
        var stateTemplate = this.fs.read(this.templatePath('_state.js'));
        var controllerName = _.capitalize(this.viewName) + 'Controller';
        var destinationPath = this.modulePath + '/' + _.toLower(this.options.moduleName) + '.routes.js';
        var processedState = ejs.render(stateTemplate, {
          controllerName: controllerName,
          viewName: _.toLower(this.viewName),
        });
        this.fs.copy(
          this.destinationPath(destinationPath),
          this.destinationPath(destinationPath), {
          process: function (content) {
            var hook = '\/\/ Yeoman hook. States section. Do not remove this comment.';
            var regEx = new RegExp(hook, 'g');
            var newContent = content.toString().replace(regEx, processedState + '\t\t\t\t' + hook);

            return newContent;
          }
        }
        );
      }
    },
    createSyles: function () {
      this.log(chalk.yellow('### Creating styles ###'));
      var self = this;
      var destinationPath = this.modulePath + '/' + _.toLower(this.viewName) + '.scss';
      this.fs.copyTpl(
        this.templatePath('_styles.scss'),
        this.destinationPath(destinationPath), {
        viewName: _.toLower(this.viewName),
      }
      );

      var appName = _.last(_.split(this.destinationRoot(), '/'));
      var viewName = _.toLower(this.viewName);
      this.fs.copy(
        'scss/' + appName + '.scss',
        this.destinationPath('scss/' + appName + '.scss'), {
        process: function (content) {
          var hook = '\/\/ Yeoman hook. Do not remove this comment.';
          var regEx = new RegExp(hook, 'g');
          var newContent = content.toString().replace(regEx,
            '@import "' + '../' + this.modulePath + '/' + viewName + '";\n' + hook);
          return newContent;
        }
      }
      )
    },
    modifyMain: function () {
      this.log(chalk.yellow('### Adding files to main ###'));
      var self = this;
      var destinationPath = this.modulePath + '/main.js';
      this.fs.copy(
        this.destinationPath(destinationPath),
        this.destinationPath(destinationPath),
        {
          process: function (content) {
            var hook = '\/\/ Yeoman hook. Define section. Do not remove this comment.';
            var regEx = new RegExp(hook, 'g');
            var substitutionString = "'./" + _.toLower(self.viewName) + ".controller',\n";
            if (!self.requiresEditRoutes) {
              substitutionString = substitutionString + "'./" + _.toLower(self.options.moduleName) + ".routes',\n";
            }
            return content.toString().replace(regEx, substitutionString + hook);
          }
        }
      );
    }
  },
  install: function () {
    // this.installDependencies();
  }
});
