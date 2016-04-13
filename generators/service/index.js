'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var interactionsHelper = require('../utils/interactionsHelper.js');

module.exports = yeoman.generators.Base.extend({
    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);

        this.argument('serviceName', {
            type: String,
            required: false
        });
    },
    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        if (!this.options.isSubCall) {
            this.log(yosay(
                'Welcome to the solid ' + chalk.red(
                    'generator-requionic:service') + ' generator!'
            ));
        }

        var prompts = [];

        if (!this.options.moduleType) {
            prompts.push(interactionsHelper.promptModuleType());
        }

        if (!this.serviceName) {
            var prompt = {
                type: 'input',
                name: 'serviceName',
                message: 'Service name: '
            };
            prompts.push(prompt);
        }

        if (!this.options.moduleName) {
            var prompt = {
                type: 'input',
                name: 'moduleName',
                message: 'Module name: '
            };
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
            this.prompt(prompts, function (answers) {

                this.options.moduleType = this.options.moduleType || answers.moduleType;

                this.serviceName = this.serviceName || answers.serviceName;
                //Normalize service input name.
                this.serviceName = _.kebabCase(this.serviceName);

                this.options.moduleName = this.options.moduleName || answers.moduleName;
                //Normalize module input name.
                this.options.moduleName = _.kebabCase(this.options.moduleName);

                this.options.author = this.options.author || answers.author;

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

        createService: function () {
            this.log(chalk.yellow('### Creating service ###'));
            var destinationPath = this.modulePath + '/' + _.toLower(this.serviceName) + '.service.js';
            var serviceName = _.capitalize(this.serviceName) + 'Service';
            this.fs.copyTpl(
                this.templatePath('_service.js'),
                this.destinationPath(destinationPath), {
                    author: this.options.author,
                    moduleName: this.options.moduleName,
                    serviceName: serviceName,
                    date: (new Date()).toDateString()
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
                        var substitutionString = "'./" + _.toLower(self.serviceName) + ".service',\n";
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
