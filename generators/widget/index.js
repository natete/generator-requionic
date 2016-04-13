'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

module.exports = yeoman.generators.Base.extend({

    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);

        this.argument('widgetName', {
            type: String,
            required: false
        });

    },

    prompting: function () {
        var done = this.async();
        var self = this;

        var prompts = [{
            type: 'checkbox',
            name: 'widgetsToInclude',
            message: 'Which predefined components would you like to add to your project?',
            choices: [{
                name: 'Multilanguage',
                value: 'multilanguage'
            }]
        }];

        if (this.widgetName) {
            // A widget was specified in the command, check if it is available
            if (this.fs.exists(this.templatePath(this.widgetName + '/main.js'))) {
                // The widget is available, continue with the process
                this.widgetsToInclude = [this.widgetName];
                done();
            } else {
                // The widget is not currently available, abort the generation process
                this.env.error("The requested component is not currently available");
            }

        } else {
            // No name was specified in the command line, ask for it
            self.prompt(prompts, function (answers) {
                this.widgetsToInclude = answers.widgetsToInclude;

                done();
            }.bind(this));
        }
    },

    writing: {
        /**
         * Copy the widgets template folders to the projects widget folder.
         */
        copyWidgets: function () {
            var destinationRootPath = 'widgets/';
            this.log(chalk.yellow('### Installing components ###'));
            if (this.widgetsToInclude && this.widgetsToInclude.length)
                for (var i = 0; i < this.widgetsToInclude.length; i++) {
                    this.fs.copy(
                        this.templatePath(this.widgetsToInclude[i]),
                        this.destinationPath(destinationRootPath + this.widgetsToInclude[i])
                    );
                }
        },
        /**
         * Modify the widget.module.js file to include the new widgets.
         */
        configureWidgetsModule: function () {
            var self = this;
            var destinationRootPath = 'www/js/widgets/widgets.module.js';
            this.log(chalk.yellow('### Modifying widgets.module.js ###'));

            this.fs.copy(
                this.destinationPath(destinationRootPath),
                this.destinationPath(destinationRootPath),
                {
                    process: function (content) {

                        var dependenciesHook = '\/\/ Yeoman hook. Dependencies section. Do not remove this comment.';
                        var modifiers = [];

                        // TODO Check if there were already widgets included and insert a comma if so.
                        var newWidgets = '';
                        for (var i = 0; i < self.widgetsToInclude.length; i++) {
                            newWidgets += '\n\t\t\t\t\'app.widgets.' + self.widgetsToInclude[i] + '\'';

                            if (i + 1 < self.widgetsToInclude.length) {
                                newWidgets += ',';
                            } else {
                                newWidgets += dependenciesHook;
                            }
                        }

                        modifiers.push({
                            regEx: new RegExp(dependenciesHook, 'g'),
                            replacer: newWidgets
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
        /**
         * Add the required bower or npm dependencies
         */
        addWidgetsDependencies: function () {
            // TODO
        },
        /**
         * Add the needed dependencies to the requireJS imports.
         */
        addProjectDependencies: function () {
            // TODO
        }

    }

});
