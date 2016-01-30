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

    this.argument('appName', {
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
        name: 'author',
        message: 'Author name:',
        store: true
      }, {
        type: 'input',
        name: 'email',
        message: 'Email:',
        default: 'example@example.com',
        store: true
      }, {
        type: 'input',
        name: 'website',
        message: 'Website:',
        default: 'http://www.' + this.appName + '.com'
      }, {
        type: 'input',
        name: 'description',
        message: 'Description: ',
        default:'A super awesome ionic app'
      }
    ];


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
      mkdirp(this.appName + '/hooks/after_prepare');
      mkdirp(this.appName + '/plugins');
      mkdirp(this.appName + '/scss');
      mkdirp(wwwDir + '/css');
      mkdirp(wwwDir + '/img');
      mkdirp(wwwDir + '/js');
      mkdirp(wwwDir + '/lib');
    },
    createConfigFiles: function() {
      // Copy .bowerrc
      this.fs.copy(
        this.templatePath('_.bowerrc'),
        this.destinationPath(this.appName + '/.bowerrc')
      );

      // Copy .editorconfig
      this.fs.copy(
        this.templatePath('_.editorconfig'),
        this.destinationPath(this.appName + '/.editorconfig')
      );

      // Copy .gitignore
      this.fs.copy(
        this.templatePath('_.gitignore'),
        this.destinationPath(this.appName + '/.gitignore')
      );

      // Copy bower.json with custom app name
      this.fs.copyTpl(
        this.templatePath('_bower.json'),
        this.destinationPath(this.appName + '/bower.json'),
        { appName: this.appName }
      );

      // Copy config.xml with retrieved data
      this.fs.copyTpl(
        this.templatePath('_config.xml'),
        this.destinationPath(this.appName + '/config.xml'),
        {
          appName: this.appName,
          author: this.author,
          email: this.email,
          website: this.website,
          description: this.description
        }
      );

      // Copy gulpfile
      this.fs.copyTpl(
        this.templatePath('_gulpfile.js'),
        this.destinationPath(this.appName + '/gulpfile.js'),
        {
          appName: this.appName
        }
      );

      // Copy ionic.project
      this.fs.copyTpl(
        this.templatePath('_ionic.project'),
        this.destinationPath(this.appName + '/ionic.project'),
        {
          appName: this.appName
        }
      );

      // Copy package.json
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath(this.appName + '/package.json'),
        {
          appName: this.appName
        }
      )
    }
  },

  callSubgenerators: function () {
    // this.composeWith('reqionic:module', {
    //   arguments: [
    //     this.appName
    //   ],
    //   options: {
    //     isSubCall: true
    //   }
    // });
  }
});
