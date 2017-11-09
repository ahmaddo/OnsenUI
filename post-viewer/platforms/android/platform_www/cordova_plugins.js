cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "es6-promise-plugin.Promise",
    "file": "plugins/es6-promise-plugin/www/promise.js",
    "pluginId": "es6-promise-plugin",
    "runs": true
  },
  {
    "id": "cordova-plugin-screen-orientation.screenorientation",
    "file": "plugins/cordova-plugin-screen-orientation/www/screenorientation.js",
    "pluginId": "cordova-plugin-screen-orientation",
    "clobbers": [
      "cordova.plugins.screenorientation"
    ]
  },
  {
    "id": "nl.madebymark.share.Share",
    "file": "plugins/nl.madebymark.share/www/share.js",
    "pluginId": "nl.madebymark.share",
    "clobbers": [
      "window.navigator.share"
    ]
  },
  {
    "id": "cordova-plugin-x-socialsharing.SocialSharing",
    "file": "plugins/cordova-plugin-x-socialsharing/www/SocialSharing.js",
    "pluginId": "cordova-plugin-x-socialsharing",
    "clobbers": [
      "window.plugins.socialsharing"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.2",
  "es6-promise-plugin": "4.1.0",
  "cordova-plugin-screen-orientation": "2.0.1",
  "nl.madebymark.share": "0.1.1",
  "cordova-plugin-x-socialsharing": "5.2.1"
};
// BOTTOM OF METADATA
});