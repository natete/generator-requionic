'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var utils = require('../utils');
var _ = require('lodash');

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
  },
  prompting: function () {
    var done = this.async();
    var self = this;

    // Have Yeoman greet the user.
    if (!this.options.isSubCall) {
      self.log(yosay(
        'Welcome to the super-excellent ' + chalk.red('generator-reqionic') + ' generator!\n by'
        ));
      self.log(utils.greeting);
    }

    this.availablePlugins = utils.getAvailablePlugins();

    // getting all defined choices from all available plugins
    var pluginChoices = [];
    for (var availablePlugin in this.availablePlugins) {
      pluginChoices.push({name: this.availablePlugins[availablePlugin].name,
        value: availablePlugin});
    }

    var prompts = [{
        type: 'checkbox',
        name: 'componentsToBeCreated',
        message: 'Which plugins do you need to add?',
        choices: pluginChoices
      }];

    self.prompt(prompts, function (answers) {
      this.author = answers.author;
      this.componentsToBeCreated = answers.componentsToBeCreated;

      done();
    }.bind(this));
  },
  writing: {
    addPlugin: function () {
      for (var component in this.componentsToBeCreated) {
        this.log(chalk.yellow('### Adding plugin ' + this.availablePlugins[this.componentsToBeCreated[component]].name
          + ' ###'));
        if (this.availablePlugins[this.componentsToBeCreated[component]].source) {
          this.spawnCommandSync('ionic', ['plugin', 'add',
            this.availablePlugins[this.componentsToBeCreated[component]].name + '@'
              + this.availablePlugins[this.componentsToBeCreated[component]].spec]);
        }
      }
    }
  }
});
