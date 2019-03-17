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
  [types.ADD_NEW_RESULTS](state, payload) {
    if (payload.length) {
      state.results = state.results.concat(payload);
    }
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
