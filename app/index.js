var React = require('react');
var ReactDom = require('react-dom');
var routes = require('./config/routes');
var Raven = require('raven-js');

var sentryKey = '1d89ec17e72b4735aaafa6ba860a198f';
var sentryApp = '111453';
var sentryUrl = 'https://' + sentryKey + '@sentry.io/' + sentryApp;

var _APP_INFO = {
  name: 'Github Battle',
  branch: 'master',
  version: '1.0'
};

window.onerror = function () {
  Raven.showReportDialog();
}

Raven.config(sentryUrl, {
  release: _APP_INFO.version,
  tags: {
    branch: _APP_INFO.branch
  }
}).install();

ReactDom.render(
  routes,
  document.getElementById('app')
);
