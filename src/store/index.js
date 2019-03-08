import Vue from 'vue';
import Vuex from 'vuex';

import * as getters from './getters';
import mutations from './mutations';
import * as actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ui: {
      rootExpanded: false,
      resultsExpanded: false,
      settingsExpanded: true,
    },
    selectors: {
      participants: `#sug-participants > div > textarea`,
      startDate: `#sug-dates > label.from > input`,
      endDate: `#sug-dates > label.to > input`,
      detailsPage: `#b-cases > tbody > tr:nth-child(1) > td.num > div > a`,
      submitButton: `#b-form-submit > div > button`,
    },
    filterValues: {
      participants: `ООО`,
      startDate: `04.03.2019`,
      endDate: `07.03.2019`,
    },
  },
  getters,
  mutations,
  actions,
});
