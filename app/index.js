import React from 'react';
import ReactDom from 'react-dom';
import routes from './config/routes';
import Raven from 'raven-js';

const sentryKey = '1d89ec17e72b4735aaafa6ba860a198f';
const sentryApp = '111453';
const sentryUrl = 'https://' + sentryKey + '@sentry.io/' + sentryApp;

const _APP_INFO = {
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
