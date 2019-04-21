import axios from 'axios';
import * as types from './mutation-types';
import { tabRequests } from '../constants/tabs';

export const setFoo = ({ commit }, payload) => {
  commit(types.UPDATE_FOO, payload);
};

export const toggleRoot = ({ commit, state }) => {
  commit(types.UPDATE_UI_ROOT_EXPANDED, !state.ui.rootExpanded);
};

export const toggleSettings = ({ commit }) => {
  const settingsExpanded = true;
  const resultsExpanded = !settingsExpanded;
  commit(types.UPDATE_UI_SETTINGS_EXPANDED, settingsExpanded);
  commit(types.UPDATE_UI_RESULTS_EXPANDED, resultsExpanded);
};

export const toggleResults = ({ commit }) => {
  const resultsExpanded = true;
  const settingsExpanded = !resultsExpanded;
  commit(types.UPDATE_UI_RESULTS_EXPANDED, resultsExpanded);
  commit(types.UPDATE_UI_SETTINGS_EXPANDED, settingsExpanded);
};

export const createDomObserver = ({ dispatch, commit, state }) => {
  const mutationObserver = new MutationObserver(() => {
    console.log(`Results updated. New results parsing started...`);
    dispatch(`parseNewResults`);
  });

  const resultsContainer = state.selectors.dataQueries.resultsContainer();
  if (resultsContainer) {
    mutationObserver.observe(resultsContainer, {
      attributes: false,
      characterData: false,
      childList: true,
      subtree: true,
      attributeOldValue: false,
      characterDataOldValue: false,
    });

    commit(types.UPDATE_DOM_OBSERVER);
  } else {
    console.warn(`Results Container not found!`);
  }
};

export const applyFilter = ({ state, commit }) => {
  commit(types.CLEAR_RESULTS);
  const { selectors, filterValues } = state;
  const court = document.querySelector(selectors.court);
  const addCourt = document.querySelector(selectors.addCourt);
  const startDate = document.querySelector(selectors.startDate);
  const endDate = document.querySelector(selectors.endDate);
  const submitButton = document.querySelector(selectors.submitButton);

  if (startDate) {
    startDate.value = state.filterValues.dateFrom;
  }

  if (endDate) {
    endDate.value = state.filterValues.dateTo;
  }

  if (court && !state.courtsFilled) {
    const courtNames = filterValues.courts.split(`\n`).map(dirtyName => dirtyName.trim());
    const timer = setInterval(() => {
      if (!courtNames.length) {
        commit(types.SET_COURTS_FILLED, true);
        clearInterval(timer);
        if (submitButton) {
          submitButton.click();
        }

        return;
      }

      const name = courtNames.shift();
      if (addCourt) {
        court.value = name;
        addCourt.click();
      }
    }, 250);
  } else {
    if (submitButton) {
      submitButton.click();
    }
  }
};

export const parseNewResults = ({ state, commit, dispatch }) => {
  const { caseRows } = state.selectors.dataQueries;

  const cases = caseRows().map(c => {
    const date = c.querySelector(`td.num div.b-container span`).innerText;
    const link = c.querySelector(`td.num a.num_case`);
    const href = link.href;
    const text = link.innerText;
    const court = c.querySelector(`td.court`).innerText.replace(`\n`, `, `);

    const claimantName = c.querySelector(`td.plaintiff`).innerText;
    const claimantDetails = (c.querySelector(`td.plaintiff span.js-rolloverHtml`) || { innerText: `` }).innerText;
    let innMatch = claimantDetails.matchAll(/ИНН: ([\d]{10})/g).next();
    const claimantInn = innMatch.value ? innMatch.value[1] : `---`;
    const addressRegex = /\n[\s]*([\d]{6},[\s]+[\s\wА-Яа-я,.-]+\d)/g;
    let addressMatch = claimantDetails.matchAll(addressRegex).next();
    const claimantAddress = addressMatch.value ? addressMatch.value[1] : `---`;

    const defendantName = c.querySelector(`td.respondent`).innerText;
    const defendantDetails = (c.querySelector(`td.respondent span.js-rolloverHtml`) || { innerText: `` }).innerText;
    innMatch = defendantDetails.matchAll(/ИНН: ([\d]{10})/g).next();
    const defendantInn = innMatch.value ? innMatch.value[1] : `---`;
    addressMatch = defendantDetails.matchAll(addressRegex).next();
    const defendantAddress = addressMatch.value ? addressMatch.value[1] : `---`;

    return {
      date,
      url: { href, text },
      courtName: court,
      claimant: claimantName,
      claimantAddress: claimantAddress,
      claimantInn: claimantInn,
      claimantContacts: null,
      defendant: defendantName,
      defendantAddress: defendantAddress,
      defendantInn: defendantInn,
      defendantContacts: null,
    };
  });

  const newCases = cases.filter(c => {
    const existingIdx = state.results.findIndex(r => r.url.text === c.url.text);
    const oooRegex = new RegExp(/^ООО ["]{0,1}[А-Яа-я]/g);
    const isDefendantOoo = !!c.defendant && oooRegex.test(c.defendant);

    return isDefendantOoo && existingIdx === -1 && c.defendantInn !== `---`;
  });

  commit(types.ADD_NEW_RESULTS, newCases);

  setTimeout(() => {
    dispatch(`activateNextPage`);
  }, 5500);
};

export const activateNextPage = ({ state, commit }) => {
  const idx = state.currentPage + 1;
  const link = state.selectors.dataQueries.pagerLinks(idx);
  if (link) {
    commit(types.SET_CURRENT_PAGE, idx);
    link.click();
  } else {
    console.info(`Next Page link not found. Data extraction stopped!`);
  }
};

export const updateContacts = ({ state, commit }, payload) => {
  commit(types.UPDATE_CONTACTS, payload);
};

export const requestDefendantContacts = ({ state, commit, dispatch }) => {
  const innQueue = state.results
    .filter(r => !r.defendantContacts)
    .map(r => r.defendantInn)
    .filter(onlyUnique);

  commit(types.SET_INN_QUEUE, innQueue);

  dispatch(`queryNextContact`);
};

export const queryNextContact = ({ state, commit }) => {
  const { innQueue } = state;

  const nextInn = innQueue.shift();

  if (nextInn) {
    commit(types.SET_INN_QUEUE, innQueue);

    chrome.runtime.sendMessage({
      request: tabRequests.queryContacts,
      data: { inn: nextInn },
    });
  }
};

export const uploadDefendants = ({ state, commit }) => {
  const defMap = new Map();

  // TODO: block subsequent upload if there is uploading in progress.

  state.results
    .filter(r => !!r.defendantContacts)
    .forEach(r => {
      const issueId = r.url.text;
      const issueUrl = r.url.href;

      const newDefendant = {
        inn: r.defendantInn,
        company: r.defendant,
        address: r.defendantAddress,
        head: r.defendantContacts.head,
        phoneNumbers: r.defendantContacts.phoneNumbers,
        email: r.defendantContacts.email,
        issues: [{ issueId, issueUrl }],
      };

      if (defMap.has(newDefendant.inn)) {
        const existingDefendant = defMap.get(newDefendant.inn);
        existingDefendant.issues.push({ issueId, issueUrl });
      } else {
        defMap.set(newDefendant.inn, newDefendant);
      }
    });

  const leadModels = [...defMap.values()].map(d => generateLeadModel(d));
  if (leadModels.length) {
    const uploadTimer = setInterval(() => {
      if (!leadModels.length) {
        clearInterval(uploadTimer);
        console.log(`[Lead Upload] completed.`);
        return;
      }
      const newLead = leadModels.shift();
      axios.post(`https://sarbitr.bitrix24.ru/rest/1/g32qhiwi6wfh2wlx/crm.lead.add.json`, { fields: { ...newLead } }).then(
        response => {
          console.log(`[Lead Upload] SUCCESS => `, response);
          console.log(`There is ${leadModels.length} Lead Models left in queue.\n`);
        },
        err => {
          console.error(`[Lead Upload] ERROR => `, err);
        }
      );
    }, 5000);
  }
};

export const setClaimSum = ({ state, commit }, { claimId, claimSum }) => {
  commit(types.UPDATE_CLAIM_SUM, { claimId, claimSum });
};

export const deleteClaim = ({ state, commit }, { claimId }) => {
  const claimIndex = state.results.findIndex(r => r.url.text === claimId);
  if (claimIndex > -1) {
    const removed = state.results.splice(claimIndex, 1);
    console.log(`[Delete Claim]:\n`, { removed });
  }
};

export const removeEmptyPhones = ({ state, dispatch }) => {
  const { results } = state;
  const noPhoneClaims = results.filter(r => r.defendantContacts && r.defendantContacts.phoneNumbers === `---`).map(r => r.url.text);
  noPhoneClaims.forEach(claimId => dispatch(`deleteClaim`, { claimId }));
};

export const removeSameCity = ({ state, dispatch }) => {
  const { results } = state;
  const sameCityClaims = results.filter(r => getIsSameCities(r)).map(r => r.url.text);
  sameCityClaims.forEach(claimId => dispatch(`deleteClaim`, { claimId }));
};

function getIsSameCities(claim) {
  const zipRegex = /^([\d]{6}), Россия/gm;
  const addresses = `${claim.claimantAddress}\n${claim.defendantAddress}`;
  const matches = addresses.match(zipRegex);

  if (matches.length === 2) {
    const city1 = matches[0].slice(0, 3);
    const city2 = matches[1].slice(0, 3);
    return city1 === city2;
  }

  return false;
}

function generateLeadModel(def) {
  const matches = [...def.phoneNumbers.matchAll(/[\d() -]+/g)];
  const numbers = matches.map(m => m[0].replace(/[ ()-]+/g, ``)) || [];
  const newLead = {
    TITLE: def.company,
    NAME: def.head,
    COMPANY_TITLE: def.company,
    ADDRESS: def.address,
    COMMENTS: def.issues.map(issue => `<a href="${issue.issueUrl}">${issue.issueId}</a><br/>`).join(``),
    PHONE: numbers.map(n => {
      return { VALUE: n, VALUE_TYPE: `WORK` };
    }),
    EMAIL: def.email,
  };
  return newLead;
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
