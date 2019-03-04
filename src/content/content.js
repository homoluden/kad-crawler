import Vue from 'vue';
import App from './App';
import store from '../store';

global.browser = require('webextension-polyfill');

const rootId = `kadCrawler`;
const existing = document.getElementById(rootId);
if (existing) {
  document.removeChild(existing);
}

const root = document.createElement(`div`);
root.id = rootId;

document.body.appendChild(root);

/* eslint-disable no-new */
new Vue({
  el: `#${rootId}`,
  store,
  render: h => h(App),
});
