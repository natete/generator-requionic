'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var utils = require('../utils');
var cordova = require('cordova');
var mkdirp = require('mkdirp');
var _ = require('lodash');

module.exports = yeoman.generators.Base.extend({
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);

    this.argument('moduleName', {
      type: String,
      required: true
    });
  },

  prompting: function () {
    var self = this;
    var done = self.async();

    // Have Yeoman greet the user.
    self.log(yosay(
      'Welcome to the super-excellent ' + chalk.red('generator-reqionic') + ' generator!\n by'
    ));
    self.log(utils.greeting);

    var prompts = [
      {
        type: 'input',
        name: 'appName',
        message: 'App name:'
      },
      {
        type: 'input',
        name: 'author',
        message: 'Author name:',
        store: true
      }, {
        type: 'checkbox',
        name: 'componentsToBeCreated',
        message: 'Which components do you need to be created?',
        choices: [{
          name: 'Controller',
          value: 'controller'
        }, {
          name: 'Routes',
          value: 'routes'
        }, {
          name: 'Directive',
          value: 'directive'
        }, {
          name: 'Factory',
          value: 'factory'
        }, {
          name: 'Service',
          value: 'service'
        }]
      }];

      self.prompt(prompts, function(answers) {
        _.forEach(answers, function(value, key) {
          self[key] = value;
        });
        done();
      }.bind(self));
    },

    writing: {
      createFolders: function () {
        var wwwDir = this.appName + '/www';
        mkdirp(this.appName + '/hooks');
        mkdirp(this.appName + '/plugins');
        mkdirp(this.appName + '/scss');
        mkdirp(wwwDir + '/css');
        mkdirp(wwwDir + '/img');
        mkdirp(wwwDir + '/js');
        mkdirp(wwwDir + '/lib');
      },
      createMain: function() {
        // this.fs.copy(
        //   this.templatePath('dummyfile.txt'),
        //   this.destinationPath(this.appName + '/js/' + this.moduleName)
        // )
      }
    },

    callSubgenerators: function () {
      this.composeWith('reqionic:module', {
        arguments: [
          this.appName
        ],
        options: {
          isSubCall: true
        }
      });
    }
  });
