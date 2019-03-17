import store from './store';
import { tabNames, tabRequests } from './constants/tabs';

global.browser = require('webextension-polyfill');

alert(`Hello ${store.getters.foo}!`);

const tabs = {
  main: null,
  issue: null,
  contacts: null,
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.info(`Request received: `, { message, sender });
  switch (message.request) {
    case tabRequests.registerMe:
      switch (message.data) {
        case tabNames.main:
          tabs.main = sender.tab;
          break;
        case tabNames.issue:
          tabs.issue = sender.tab;
          break;
        case tabNames.contacts:
          tabs.contacts = sender.tab;
          break;
      }

      console.info(`New tab registered.`, { tabs });
      break;

    case tabRequests.queryContacts:
      if (!tabs.contacts) {
        chrome.tabs.create({ url: `http://www.list-org.com/?search=inn` });
        setTimeout(() => {
          queryContacts(message.data);
        }, 1000);
      } else {
        queryContacts(message.data);
      }

      break;
    default:
      break;
  }
});

function queryContacts(data) {
  console.warn(`Routine 'queryContacts' is not implemented!`);
  console.info(`Claimant and Defendant IDs:`, { ...data });

  const { contacts } = tabs;
  if (contacts) {
    contacts.sendMessage({ request: tabRequests.queryContacts, data }, contactLoaded);
  }
}

function contactLoaded(inn, data) {
  console.info(`Contact Loaded: `, { inn, data });
  const { main } = tabs;
  if (main) {
    main.sendMessage({ inn, data });
  }
}
