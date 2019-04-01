import * as types from './mutation-types';
// import store from '.';

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
    const claimantDetails = c.querySelector(`td.plaintiff span.js-rolloverHtml`).innerText;
    let innMatch = claimantDetails.matchAll(/ИНН: ([\d]{10})/g).next();
    const claimantInn = !!innMatch.value ? innMatch.value[1] : `---`;
    const addressRegex = /\n[\s]*([\d]{6},[\s]+[\s\wА-Яа-я,\.-]+\d)/g;
    let addressMatch = claimantDetails.matchAll(addressRegex).next();
    const claimantAddress = !!addressMatch.value ? addressMatch.value[1] : `---`;

    const defendantName = c.querySelector(`td.respondent`).innerText;
    const defendantDetails = c.querySelector(`td.respondent span.js-rolloverHtml`).innerText;
    innMatch = defendantDetails.matchAll(/ИНН: ([\d]{10})/g).next();
    const defendantInn = !!innMatch.value ? innMatch.value[1] : `---`;
    addressMatch = defendantDetails.matchAll(addressRegex).next();
    const defendantAddress = !!addressMatch.value ? addressMatch.value[1] : `---`;

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

    return isDefendantOoo && existingIdx === -1;
  });

  commit(types.ADD_NEW_RESULTS, newCases);

  setTimeout(() => {
    dispatch(`activateNextPage`);
  }, 5500);
};

export const activateNextPage = ({ state, commit }) => {
  // TODO: uncomment function body after BAN issue worked around
  // const idx = state.currentPage + 1;
  // const link = state.selectors.dataQueries.pagerLinks(idx);
  // if (link) {
  //   commit(types.SET_CURRENT_PAGE, idx);
  //   link.click();
  // } else {
  //   console.info(`Next Page link not found. Data extraction stopped!`);
  //   chrome.extension.sendMessage({ message: `All pages grabbed! ` });
  // }
};

export const updateContacts = ({ state, commit }, payload) => {
  commit(types.UPDATE_CONTACTS, payload);
};
