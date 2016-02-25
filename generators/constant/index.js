'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');

module.exports = yeoman.generators.Base.extend({

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    if (!this.options.isSubCall) {
      this.log(yosay(
        'Welcome to the solid ' + chalk.red('generator-reqionic:view') +
        ' generator!'
      ));
    }

    var prompts = [];

    if(!this.options.moduleName) {
      var prompt = {
        type: 'input',
        name: 'moduleName',
        message: 'Module name: '
      }
      prompts.push(prompt);
    }

    if(prompts.length) {
      this.prompt(prompts, function (props) {
        this.options.moduleName = this.options.moduleName || answers.moduleName;

        done();
      }.bind(this));
    } else {
      done();
    }

  },

  writing: {
    createConstant: function() {
      this.log(chalk.yellow('### Creating constants ###'));
      var destinationPath = 'www/js/modules/' + this.options.moduleName + '/' + _.toLower(this.options.moduleName) + '.constant.js';
      this.fs.copyTpl(
        this.templatePath('_constant.js'),
        this.destinationPath(destinationPath), {
          author: this.options.author,
          moduleName: _.toLower(this.options.moduleName),
          date: (new Date()).toDateString()
        }
      );
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
            var substitutionString = "'./" + _.toLower(self.options.moduleName) + ".constant.js',\n";
            return content.toString().replace(regEx, substitutionString + hook);
          }
        }
      );
    }
  },

  install: function () {
    this.installDependencies();
  }
});
