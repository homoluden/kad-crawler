import { tabRequests } from '../constants/tabs';

global.browser = require('webextension-polyfill');

console.info(`Contact Details page loaded.`);

const innStr = document
  .querySelector(`body > div.main > div.container.clearfix > div > div:nth-child(3) > table > tbody > tr:nth-child(2) > td:nth-child(2)`)
  .innerText.split(' / ')[0];
const headStr = document.querySelector(`div.main > div.container.clearfix table.tt tr:nth-child(1) a.upper`).innerText;
const emailStrFull = document.querySelector(`body > div.main > div.container.clearfix > div > div:nth-child(6) > p:nth-child(3) > i`).innerText;
const emailStr = emailStrFull.split(`:`)[1];

if (innStr) {
  const phoneNumbers = [...document.querySelectorAll(`div.c2m > p > a.nwra.lbs64`)].map(elm => elm.innerText);
  const phoneNumbersStr = phoneNumbers.join(`, `);

  chrome.runtime.sendMessage({
    request: tabRequests.processContacts,
    data: {
      inn: innStr,
      contacts: {
        phoneNumbers: phoneNumbersStr || `---`,
        head: headStr || `---`,
        email: emailStr || `---`,
      },
    },
  });

  const url = new URL(`http://www.list-org.com/search?type=inn&val=0`);
  const params = new URLSearchParams(url.search);
  chrome.runtime.onMessage.addListener((message, sender) => {
    console.info(`Request received: `, { message, sender });

    params.set('val', message.inn);
    window.location = `${url.pathname}?${params}`;
  });
}
