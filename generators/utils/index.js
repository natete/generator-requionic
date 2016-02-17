'use strict';
module.exports = {
  greeting: require('./greeting'),
  /**
   * Function to retrieve all available plugins.
   * @returns {Array with all available plugins}
   */
  getAvailablePlugins: function () {
    var plugins = {
      cordovaplugininappbrowser: {name: 'cordova-plugin-inappbrowser', source: 'npm', spec: '1.1.1'},
      orgapachecordovastatusbar: {name: 'org.apache.cordova.statusbar', source: 'pgb', spec: '0.1.4'},
      cordovasqlitestorage: {name: 'cordova-sqlite-storage', source: 'npm', spec: '0.7.14'},
      ionicpluginkeyboard: {name: 'ionic-plugin-keyboard', source: 'npm', spec: '1.0.8'},
      nlxservicespluginstoast: {name: 'nl.x-services.plugins.toast', source: 'pgb', spec: '2.0.2'},
      phonegappluginpush: {name: 'phonegap-plugin-push', source: 'npm', spec: '1.5.3'},
      cordovapluginvibration: {name: 'cordova-plugin-vibration', source: 'npm', spec: '2.1.0'}
    };
    return plugins;
  }
};
