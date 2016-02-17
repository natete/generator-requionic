'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');

module.exports = yeoman.generators.Base.extend({
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);

    this.argument('serviceName', {
      type: String,
      required: true
    });
  },

  prompting: function() {
    var done = this.async();

    // Have Yeoman greet the user.
    if (!this.options.isSubCall) {
      this.log(yosay(
        'Welcome to the solid ' + chalk.red(
          'generator-reqionic:service') + ' generator!'
      ));
    }

    var prompts = [];

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
        message: 'Author name: '
      }
    }

    if (prompts.length) {
      this.prompt(prompts, function(answers) {
        this.options.moduleName = this.options.moduleName || answers.moduleName;
        this.options.author = this.options.author || answers.author;

        done();
      }.bind(this));
    } else {
      done();
    }
  },

  writing: {
    createService: function() {
      this.log(chalk.yellow('### Creating service ###'));
      var destinationPath = 'www/js/modules/' + this.options.moduleName +
        '/' + _.toLower(this.serviceName) + '.service.js';
      var controllerName = _.capitalize(this.viewName) + 'Service';
      this.fs.copyTpl(
        this.templatePath('_service.js'),
        this.destinationPath(destinationPath), {
          author: this.options.author,
          moduleName: this.options.moduleName,
          serviceName: controllerName,
          date: (new Date()).toDateString()
        }
      )
    }
  },

  install: function() {
    // this.installDependencies();
  }
});
