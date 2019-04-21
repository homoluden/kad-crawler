import { tabRequests } from '../constants/tabs';

global.browser = require('webextension-polyfill');

console.info(`Contact Details page loaded.`);

const innerTexts = [...document.querySelectorAll(`div.c2m`)].map(node => node.innerText);

const innStr = extractInn(innerTexts);

if (innStr) {
  const headStr = extractHead(innerTexts);
  const emailStr = extractEmail(innerTexts);
  const phoneNumbers = extractPhoneNumbers(innerTexts);

  chrome.runtime.sendMessage({
    request: tabRequests.processContacts,
    data: {
      inn: innStr,
      contacts: {
        phoneNumbers: phoneNumbers,
        head: headStr,
        email: emailStr,
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

function extractInn(innerTexts) {
  const innStrRegex = /ИНН: [\d]{10}/g;
  let inn = null;

  var BreakException = {};
  try {
    innerTexts.forEach(text => {
      const matches = text.match(innStrRegex);
      if (matches && matches.length > 0) {
        inn = matches[0].replace(`ИНН: `, ``);
        throw BreakException;
      }
    });
  } catch (e) {
    if (e !== BreakException) throw e;
  }

  return inn;
}

function extractHead(innerTexts) {
  const headStrRegex = /Руководитель:\t.+/g;
  let head = null;

  var BreakException = {};
  try {
    innerTexts.forEach(text => {
      const matches = text.match(headStrRegex);
      if (matches && matches.length > 0) {
        head = matches[0].replace(`Руководитель:\t`, ``);
        throw BreakException;
      }
    });
  } catch (e) {
    if (e !== BreakException) throw e;
  }

  return head;
}

function extractEmail(innerTexts) {
  const emailStrRegex = /E-mail:[ ]{0,1}.*/g;
  let email = null;

  var BreakException = {};
  try {
    innerTexts.forEach(text => {
      const matches = text.match(emailStrRegex);
      if (matches && matches.length > 0) {
        email = matches[0].replace(`E-mail:`, ``).trim();
        throw BreakException;
      }
    });
  } catch (e) {
    if (e !== BreakException) throw e;
  }

  return email && email.length ? email : `---`;
}

function extractPhoneNumbers(innerTexts) {
  const phoneStrRegex = /Телефон:[ ]{0,1}.*/g;
  let phone = null;

  var BreakException = {};
  try {
    innerTexts.forEach(text => {
      const matches = text.match(phoneStrRegex);
      if (matches && matches.length > 0) {
        phone = matches[0].replace(`Телефон:`, ``).trim();
        throw BreakException;
      }
    });
  } catch (e) {
    if (e !== BreakException) throw e;
  }

  return phone && phone.length ? phone : `---`;
}
