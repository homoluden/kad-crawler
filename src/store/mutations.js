import * as types from './mutation-types';

export default {
  [types.UPDATE_FOO](state, payload) {
    state.foo = payload;
  },
  [types.UPDATE_UI_ROOT_EXPANDED](state, payload) {
    state.ui.rootExpanded = payload;
  },
  [types.UPDATE_UI_RESULTS_EXPANDED](state, payload) {
    state.ui.resultsExpanded = payload;
  },
  [types.UPDATE_UI_SETTINGS_EXPANDED](state, payload) {
    state.ui.settingsExpanded = payload;
  },
  [types.UPDATE_DOM_OBSERVER](state, payload) {
    state.ui.domObserver = payload;
  },
  [types.UPDATE_CLAIM_SUM](state, payload) {
    state.ui.domObserver = payload;
  },
  [types.UPDATE_CONTACTS](state, payload) {
    const { inn: innToUpdate, contacts } = payload;
    const recordsWithInn = [];
    state.results.forEach(r => {
      if (r.claimantInn === innToUpdate || r.defendantInn === innToUpdate) {
        recordsWithInn.push(r);

        if (r.claimantInn === innToUpdate) {
          r.claimantContacts = contacts;
        }
        if (r.defendantInn === innToUpdate) {
          r.defendantContacts = contacts;
        }
      }
    });
    console.info(`[Main Tab] Records with INN given: `, recordsWithInn);
  },
  [types.UPDATE_CLAIM_SUM](state, { claimId, claimSum }) {
    const claimIndex = state.results.findIndex(r => r.url.text === claimId);
    if (claimIndex > -1) {
      state.results[claimIndex].url = { ...state.results[claimIndex].url, claimSum };
    }
  },
  [types.ADD_NEW_RESULTS](state, payload) {
    if (payload.length) {
      state.results = state.results.concat(payload);
    }
  },
  [types.SET_INN_QUEUE](state, payload) {
    state.innQueue = payload;
  },
  [types.CLEAR_RESULTS](state) {
    state.results = [];
  },
  [types.SET_CURRENT_PAGE](state, payload) {
    state.currentPage = payload;
  },
  [types.SET_COURTS_FILLED](state, payload) {
    state.courtsFilled = payload;
  },
};
