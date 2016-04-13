'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var interactionsHelper = require('../utils/interactionsHelper.js');

module.exports = yeoman.generators.Base.extend({

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

        if (!this.options.moduleType) {
            prompts.push(interactionsHelper.promptModuleType());
        }

        if (!this.options.moduleName) {
            var prompt = {
                type: 'input',
                name: 'moduleName',
                message: 'Module name: '
            };
            prompts.push(prompt);
        }

        if (prompts.length) {
            this.prompt(prompts, function (props) {

                this.options.moduleType = this.options.moduleType || answers.moduleType;

                this.options.moduleName = this.options.moduleName || answers.moduleName;
                //Normalize module input name.
                this.options.moduleName = _.kebabCase(this.options.moduleName);

                done();
            }.bind(this));
        } else {
            done();
        }

    },

    writing: {

        preprocessModule: function () {
            this.modulePath = 'www/js/' + this.options.moduleType + '/' + this.options.moduleName;
        },

        createValue: function () {
            this.log(chalk.yellow('### Creating values ###'));
            var destinationPath = this.modulePath + '/' + _.toLower(this.options.moduleName) + '.value.js';
            this.fs.copyTpl(
                this.templatePath('_value.js'),
                this.destinationPath(destinationPath), {
                    author: this.options.author,
                    moduleName: _.toLower(this.options.moduleName),
                    date: (new Date()).toDateString()
                }
            );
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
                        var substitutionString = "'./" + _.toLower(self.options.moduleName) + ".value',\n";
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
