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
    checkPlugins: function () {
        // depending on the selected option, we show the list or not
        if (this.option !== 'nothing') {
            this.availablePlugins = utils.getAvailablePlugins();
            // getting all defined choices from all available plugins
            var pluginChoices = [];
            for (var availablePlugin in this.availablePlugins) {
                pluginChoices.push({
                    name: this.availablePlugins[availablePlugin].name,
                    value: availablePlugin
                });
            }
            var pluginsPrompts = [{
                type: 'checkbox',
                name: 'plugins',
                message: 'Which plugins do you need to ' + this.option + '?',
                choices: pluginChoices
            }];
            var done = this.async();
            var self = this;
            self.prompt(pluginsPrompts, function (answers) {
                this.plugins = answers.plugins;
                done();
            }.bind(this));
        }
    },
    prompting: function () {
        var done = this.async();
        var self = this;
        // Have Yeoman greet the user.
        if (!this.options.isSubCall) {
            self.log(yosay(
                'Welcome to the super-excellent ' + chalk.red('generator-requionic') + ' generator!\n by'
            ));
            self.log(utils.greeting);
        }
        // Default option, do nothing.
        this.option = 'nothing';
        this.plugins = [];
        // first of all, astking if the user want to add plugins
        var prompts = [{
            type: 'confirm',
            name: 'addOption',
            message: 'Do you want to add plugins?',
            required: true
        }];
        // Asking it
        self.prompt(prompts, function (answers) {
            if (answers.addOption) {
                this.option = 'add';
                done();
            } else {
                // Asking if the user want to remove some plugins
                var removePluginsPrompts = [{
                    type: 'confirm',
                    name: 'removeOption',
                    message: 'Do you want to remove plugins?',
                    required: true
                }];
                self.prompt(removePluginsPrompts, function (answers) {
                    if (answers.removeOption) {
                        this.option = 'remove';
                    }
                    done();
                }.bind(this));
            }
        }.bind(this));
    },
    writing: {
        processPlugin: function () {
            if (this.option !== 'nothing' && this.plugins.length > 0) {
                for (var component in this.plugins) {
                    this.log(chalk.yellow('### ' + chalk.red('generator-requionic') + ' will ' + this.option + ' the plugin '
                        + this.availablePlugins[this.plugins[component]].name
                        + ' ###'));
                    if (this.availablePlugins[this.plugins[component]].source) {
                        this.spawnCommandSync('ionic', ['plugin', this.option,
                            this.availablePlugins[this.plugins[component]].name + '@'
                            + this.availablePlugins[this.plugins[component]].spec]);
                    }
                }
            }
        }
    }
});
