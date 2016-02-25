'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var ejs = require('ejs');

module.exports = yeoman.generators.Base.extend({
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);

    this.argument('viewName', {
      type: String,
      required: false
    });
  },

  prompting: function() {
    var done = this.async();

    // Have Yeoman greet the user.
    if (!this.options.isSubCall) {
      this.log(yosay(
        'Welcome to the solid ' + chalk.red('generator-reqionic:view') +
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
      this.prompt(prompts, function(answers) {
        this.viewName = this.viewName || answers.viewName;
        this.options.moduleName = this.options.moduleName || answers.moduleName;
        this.options.author = this.options.author || answers.author;

        done();
      }.bind(this));
    } else {
      done();
    }
  },

  writing: {
    createView: function() {
      this.log(chalk.yellow('### Creating view ###'));
      this.fs.copy(
        this.templatePath('_view.html'),
        this.destinationPath('www/js/modules/' + _.toLower(this.options.moduleName) +
        '/' + _.toLower(this.viewName) + '.html')
      );
    },

    createController: function() {
      this.log(chalk.yellow('### Creating controller ###'));
      var destinationPath = 'www/js/modules/' + this.options.moduleName + '/' + _.toLower(this.viewName) + '.controller.js';
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

    createRoutes: function() {
      if(!this.fs.exists('www/js/modules/' +  _.toLower(this.options.moduleName) + '/' + _.toLower(this.options.moduleName) + '.routes.js')) {
        this.log(chalk.yellow('### Creating routes ###'));
        var destinationPath = 'www/js/modules/' +  _.toLower(this.options.moduleName) + '/' + _.toLower(this.options.moduleName) + '.routes.js';
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

    modifyRoutes: function() {
      if(this.requiresEditRoutes) {
        this.log(chalk.yellow('### Modifying routes ###'));
        var stateTemplate = this.fs.read(this.templatePath('_state.js'));
        var controllerName = _.capitalize(this.viewName) + 'Controller';
        var destinationPath = 'www/js/modules/' +  _.toLower(this.options.moduleName) + '/' + _.toLower(this.options.moduleName) + '.routes.js';
        var processedState = ejs.render(stateTemplate, {
          controllerName: controllerName,
          viewName: _.toLower(this.viewName),
        });
        this.fs.copy(
          this.destinationPath(destinationPath),
          this.destinationPath(destinationPath), {
            process: function(content) {
              var hook = '\/\/ Yeoman hook. States section. Do not remove this comment.';
              var regEx = new RegExp(hook, 'g');
              var newContent = content.toString().replace(regEx, processedState + '\t\t\t\t' + hook);

              return newContent;
            }
          }
        );
      }
    },

    createSyles: function() {
      this.log(chalk.yellow('### Creating styles ###'));
      var self = this;
      var destinationPath = 'www/js/modules/' + _.toLower(this.options.moduleName) + '/' + _.toLower(this.viewName) + '.scss';
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
          process: function(content) {
            var hook = '\/\/ Yeoman hook. Do not remove this comment.';
            var regEx = new RegExp(hook, 'g');
            var newContent = content.toString().replace(regEx,
              '@import "' + '../www/js/modules/' + _.toLower(self.options.moduleName)  + '/' + viewName +
              '";\n' + hook);
              return newContent;
            }
          }
        )
      },

      modifyMain: function() {
        this.log(chalk.yellow('### Adding files to main ###'));
        var self = this;
        var destinationPath = 'www/js/modules/' + _.toLower(this.options.moduleName) + '/main.js';
        this.fs.copy(
          this.destinationPath(destinationPath),
          this.destinationPath(destinationPath),
          {
            process: function(content) {
              var hook = '\/\/ Yeoman hook. Define section. Do not remove this comment.';
              var regEx = new RegExp(hook, 'g');
              var substitutionString = "'./" + _.toLower(self.viewName) + ".controller.js',\n";
              if(!self.requiresEditRoutes) {
                substitutionString = substitutionString + "'./" + _.toLower(self.options.moduleName) + ".routes.js',\n";
              }
              return content.toString().replace(regEx, substitutionString + hook);
            }
          }
        );
      }
    },

    install: function() {
      // this.installDependencies();
    }
  });
