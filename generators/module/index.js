'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var utils = require('../utils');
var _ = require('lodash');
var interactionsHelper = require('../utils/interactionsHelper.js');

module.exports = yeoman.generators.Base.extend({
    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);

        this.argument('moduleName', {
            type: String,
            required: false
        });

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
        var prompts = [];

        if (!this.moduleName) {
            var prompt = {
                type: 'input',
                name: 'moduleName',
                message: 'Module name'
            };

            prompts.push(prompt);
        }

        if (!this.options.author) {
            var prompt = {
                type: 'input',
                name: 'author',
                message: 'Author name: ',
                store: true
            };
            prompts.push(prompt);
        }

        prompts.push(interactionsHelper.promptModuleType());

        prompts.push(
            {
                type: 'checkbox',
                name: 'componentsToBeCreated',
                message: 'Which components do you need to be created?',
                choices: [
                    {
                        name: 'Controller',
                        value: 'controller'
                    },
                    {
                        name: 'Directive',
                        value: 'directive'
                    },
                    {
                        name: 'Factory',
                        value: 'factory'
                    },
                    {
                        name: 'Service',
                        value: 'service'
                    },
                    {
                        name: 'Constant',
                        value: 'constant'
                    },
                    {
                        name: 'Value',
                        value: 'value'
                    }
                ]
            }
        );

        self.prompt(prompts, function (answers) {
            this.moduleName = this.moduleName || answers.moduleName;
            //Normalize module input name.
            this.moduleName = _.kebabCase(this.moduleName);
            this.options.author = this.options.author || answers.author;
            this.moduleType = answers.moduleType;
            this.componentsToBeCreated = answers.componentsToBeCreated;

            done();
        }.bind(this));
    },
    writing: {

        preprocessModule: function () {
            this.modulePath = 'www/js/' + this.moduleType + '/' + this.moduleName;
        },

        createMain: function () {
            var self = this;
            var module = this.moduleName;
            this.log(chalk.yellow('### Creating main ###'));
            this.log(chalk.yellow('### Components: ' + JSON.stringify(this.componentsToBeCreated) + ' ###'));
            this.fs.copyTpl(
                this.templatePath('_main.js'),
                this.destinationPath(self.modulePath + '/main.js'), {
                    author: this.options.author,
                    module: module
                }
            );
        },
        createModule: function () {
            var self = this;
            this.log(chalk.yellow('### Creating module ' + this.moduleName + ' ###'));
            this.fs.copyTpl(
                this.templatePath('_module.js'),
                this.destinationPath(self.modulePath + '/' + this.moduleName + '.module.js'), {
                    author: this.options.author,
                    module: this.moduleName,
                    date: (new Date()).toDateString()
                }
            );
        }
    },
    modifyApp: function () {
        this.log(chalk.yellow('### Modifying app.js ###'));
        var self = this;
        var moduleName = this.moduleName;
        this.fs.copy(
            'www/js/app.js',
            this.destinationPath('www/js/app.js'), {
                process: function (content) {
                    var defineHook = '\/\/ Yeoman hook. Define section. Do not remove this comment.';
                    var dependenciesHook = '\/\/ Yeoman hook. Dependencies section. Do not remove this comment.';
                    var modifiers = [];
                    modifiers.push({
                        regEx: new RegExp(defineHook, 'g'),
                        replacer: ',\n\t\t\'./' + self.moduleType + '/' + self.moduleName + '/main\'' + defineHook
                    });
                    modifiers.push({
                        regEx: new RegExp(dependenciesHook, 'g'),
                        replacer: ',\n\t\t\t\t\'app.' + moduleName + '\'' + dependenciesHook
                    });
                    var newContent = content.toString();
                    modifiers.forEach(function (modifier) {
                        newContent = newContent.replace(modifier.regEx, modifier.replacer);
                    });
                    return newContent;
                }
            }
        );
    },
    callSubgenerators: function () {
        var options = {
            isSubCall: true,
            author: this.options.author,
            moduleName: this.moduleName,
            moduleType: this.moduleType
        };
        if (this.componentsToBeCreated.indexOf('controller') >= 0) {
            this.composeWith('requionic:view', {
                arguments: [
                    this.moduleName
                ],
                options: options
            });
        }

        if (this.componentsToBeCreated.indexOf('service') >= 0) {
            this.composeWith('requionic:service', {
                arguments: [
                    this.moduleName
                ],
                options: options
            });
        }

        if (this.componentsToBeCreated.indexOf('factory') >= 0) {
            this.composeWith('requionic:factory', {
                arguments: [
                    this.moduleName
                ],
                options: options
            });
        }

        if (this.componentsToBeCreated.indexOf('constant') >= 0) {
            this.composeWith('requionic:constant', {
                options: options
            });
        }

        if (this.componentsToBeCreated.indexOf('value') >= 0) {
            this.composeWith('requionic:value', {
                options: options
            });
        }
    }
});
