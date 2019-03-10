import * as types from './mutation-types';

export const setFoo = ({ commit }, payload) => {
  commit(types.UPDATE_FOO, payload);
};

export const toggleRoot = ({ commit, state }) => {
  commit(types.UPDATE_UI_ROOT_EXPANDED, !state.ui.rootExpanded);
};

export const toggleSettings = ({ commit, state }) => {
  const settingsExpanded = true;
  const resultsExpanded = !settingsExpanded;
  commit(types.UPDATE_UI_SETTINGS_EXPANDED, settingsExpanded);
  commit(types.UPDATE_UI_RESULTS_EXPANDED, resultsExpanded);
};

export const toggleResults = ({ commit, state }) => {
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

export const applyFilter = ({ state }) => {
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
    startDate.value = filterValues.startDate;
  }

  if (endDate) {
    endDate.value = filterValues.endDate;
  }

  if (court) {
    const courtNames = filterValues.courts.split(`\n`).map(dirtyName => dirtyName.trim());
    const timer = setInterval(() => {
      if (!courtNames.length) {
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
      defendant: defendants[i],
      defendantAddress: defendantAddresses[i],
      defendantInn: defendantInns[i],
    };
  });

  console.log(`New Results parsed:\n`, zipped);
  commit(types.ADD_NEW_RESULTS, zipped);

  setTimeout(() => {
    dispatch(`activateNextPage`);
  }, 200);
};

export const activateNextPage = ({ state, commit }) => {
  const idx = state.currentPage + 1;
  const link = state.selectors.dataQueries.pagerLinks(idx);
  if (link) {
    commit(types.SET_CURRENT_PAGE, idx);
    link.click();
  }
};
