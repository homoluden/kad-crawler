import { tabRequests, tabNames } from '../constants/tabs';

global.browser = require('webextension-polyfill');

const url = new URL(location.href);
const params = new URLSearchParams(url.search);
const inn = params.get('val');
console.info(`Contacts page loaded.`);
if (inn) {
  chrome.runtime.sendMessage({ request: tabRequests.processContacts, data: { inn, phoneNumbers: `` } });
}

chrome.runtime.onMessage.addListener((message, sender) => {
  console.info(`Request received: `, { message, sender });

  params.set('val', message.inn);
  window.location = `${location.pathname}?${params}`;
});
