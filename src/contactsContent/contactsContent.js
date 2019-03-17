import { tabRequests } from '../constants/tabs';

global.browser = require('webextension-polyfill');

console.info(`Contacts page loaded.`);

const detailsLink = document.querySelector(`body > div.main > div.content > div.org_list > p > label > a`);
if (detailsLink) {
  detailsLink.click();
}
