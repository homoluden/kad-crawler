import * as types from './mutation-types';

export const setFoo = ({ commit }, payload) => {
  commit(types.UPDATE_FOO, payload);
};

export const toggleMinimized = ({ commit, state }) => {
  commit(types.UPDATE_UI_MINIMIZED, !state.ui.minimized);
};
