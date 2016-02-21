'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');

module.exports = yeoman.generators.Base.extend({
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);

    this.argument('factoryName', {
      type: String,
      required: false
    });
  },

  prompting: function() {
    var done = this.async();

    // Have Yeoman greet the user.
    if (!this.options.isSubCall) {
      this.log(yosay(
        'Welcome to the solid ' + chalk.red(
          'generator-reqionic:factory') + ' generator!'
      ));
    }

    var prompts = [];

    if (!this.factoryName) {
      var prompt = {
        type: 'input',
        name: 'factoryName',
        message: 'Factory name: '
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
        message: 'Author name: '
      }
    }

    if (prompts.length) {
      this.prompt(prompts, function(answers) {
        this.factoryName = this.factoryName || answers.factoryName;
        this.options.moduleName = this.options.moduleName || answers.moduleName;
        this.options.author = this.options.author || answers.author;

        done();
      }.bind(this));
    } else {
      done();
    }
  },

  writing: {
    createFactory: function() {
      this.log(chalk.yellow('### Creating facty ###'));
      var destinationPath = 'www/js/modules/' + this.options.moduleName +
        '/' + _.toLower(this.factoryName) + '.factory.js';
      var factoryName = _.capitalize(this.factoryName) + 'Factory';
      this.fs.copyTpl(
        this.templatePath('_factory.js'),
        this.destinationPath(destinationPath), {
          author: this.options.author,
          moduleName: this.options.moduleName,
          factoryName: factoryName,
          date: (new Date()).toDateString()
        }
      )
    }
  },

  install: function() {
    // this.installDependencies();
  }
});
