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
        createTabAndQueryContacts(message.data, sendResponse);
      } else {
        queryContacts(message.data, sendResponse);
      }

      break;
    default:
      break;
  }
});

function createTabAndQueryContacts(data, sendResponse) {
  chrome.tabs.create({ url: `http://www.list-org.com/search?type=inn&val=${data.inn}`, active: false }, tab => {
    tabs.contacts = tab;
    console.info(`Contacts Tab created.`, tab);
    setTimeout(() => {
      queryContacts(data, sendResponse);
    }, 1000);
  });
}

function queryContacts(data, sendResponse) {
  console.info(`INN:`, { ...data });
  const { contacts } = tabs;
  if (contacts) {
    const loadingTimer = setInterval(() => {
      chrome.tabs.get(contacts.id, contactsTab => {
        if (!contactsTab) {
          clearInterval(loadingTimer);
          tabs.contacts = null;
          createTabAndQueryContacts(data, sendResponse);
          return;
        }

        console.info(`Contacts Tab status: ${contactsTab.status}`, { contactsTab });
        if (contactsTab.status === `complete`) {
          chrome.tabs.sendRequest(contactsTab.id, { inn: data.inn }, response => {
            sendResponse(response);
          });
          clearInterval(loadingTimer);
          console.log(`Contacts poll stopped.`);
        }
      });
    }, 1000);
  }
}

function contactLoaded(inn, data, sendResponse) {
  console.info(`Contact Loaded: `, { inn, data });
  const { main } = tabs;
  if (sendResponse) {
    sendResponse({ inn, data });
  } else if (main) {
    main.sendMessage({ inn, data });
  } else {
    console.warn(`Cannot process loaded contacts. No handlers available!`);
  }
}
