import * as types from './mutation-types';

export default {
  [types.UPDATE_FOO](state, payload) {
    state.foo = payload;
  },
  [types.UPDATE_UI_ROOT_EXPANDED](state, payload) {
    state.ui.rootExpanded = payload;
  },
  [types.UPDATE_UI_SETTINGS_EXPANDED](state, payload) {
    state.ui.settingsExpanded = payload;
  },
  [types.UPDATE_UI_RESULTS_EXPANDED](state, payload) {
    state.ui.resultsExpanded = payload;
  },
};
