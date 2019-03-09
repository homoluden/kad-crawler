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

export const parseNewResults = ({ commit, state }) => {
  console.warn(`Action "parseNewResults" not implemented!`);
};
