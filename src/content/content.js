import Vue from 'vue';
import App from './App';
import store from '../store';
import { tabRequests, tabNames } from '../constants/tabs';

import 'icons/styles.css';

global.browser = require('webextension-polyfill');

const rootId = `kadCrawler`;
const existing = document.getElementById(rootId);
if (existing) {
  document.removeChild(existing);
}

const root = document.createElement(`div`);
root.id = rootId;

document.body.appendChild(root);

chrome.runtime.sendMessage({ request: tabRequests.registerMe, data: tabNames.main });

/* eslint-disable no-new */
new Vue({
  el: `#${rootId}`,
  store,
  render: h => h(App),
});

chrome.runtime.onMessage.addListener((message, sender) => {
  console.info(`Main Tab received message: `, { message, sender });

  if (message.request === tabRequests.processContacts) {
    console.info(`Starting to process received contacts... `, { message });
  }
});
