import * as types from './mutation-types';
//import store from '.';

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
  const participant = document.querySelector(selectors.participants);
  const court = document.querySelector(selectors.court);
  const addCourt = document.querySelector(selectors.addCourt);
  const startDate = document.querySelector(selectors.startDate);
  const endDate = document.querySelector(selectors.endDate);
  const submitButton = document.querySelector(selectors.submitButton);

  if (participant) {
    participant.value = filterValues.participants;
  }

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
  const { date, issueDetailsUrl, courtName, claimant, claimantAddress, claimantInn, defendant, defendantAddress, defendantInn } = state.selectors.dataQueries;

  const dateItems = date();
  const urls = issueDetailsUrl();
  const courtNames = courtName();
  const claimants = claimant();
  const claimantAddresses = claimantAddress();
  const claimantInns = claimantInn();
  const defendants = defendant();
  const defendantAddresses = defendantAddress();
  const defendantInns = defendantInn();

  const zipped = dateItems.map((date, i) => {
    return {
      date,
      url: urls[i],
      courtName: courtNames[i],
      claimant: claimants[i],
      claimantAddress: claimantAddresses[i],
      claimantInn: claimantInns[i],
      claimantContacts: null,
      defendant: defendants[i],
      defendantAddress: defendantAddresses[i],
      defendantInn: defendantInns[i],
      defendantContacts: null,
    };
  });

  commit(types.ADD_NEW_RESULTS, zipped);

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
    chrome.extension.sendMessage({ message: `All pages grabbed! ` });
  }
};

export const updateContacts = ({ state, commit }, payload) => {
  commit(types.UPDATE_CONTACTS, payload);
};
