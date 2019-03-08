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
      court: `#caseCourt input[type=text]`,
      addCourt: `#caseCourt > div > i.b-icon--courts.add`,
      startDate: `#sug-dates > label.from > input`,
      endDate: `#sug-dates > label.to > input`,
      detailsPage: `#b-cases > tbody > tr:nth-child(1) > td.num > div > a`,
      submitButton: `#b-form-submit > div > button`,
    },
    filterValues: {
      participants: `ООО`,
      startDate: `04.03.2019`,
      endDate: `07.03.2019`,
      courts: `АС Алтайского края
АС Архангельской области
АС Астраханской области
АС Белгородская область
АС Брянская область
АС Владимирская область
АС Волгоградская область
АС Вологодская область
АС Воронежская область
АС Иркутская область
АС Калужская область
АС Кемеровская область
АС Краснодарский край
АС Курская область
АС Липецкая область
АС Московская область
АС города Москвы
АС Нижегородская область
АС Новгородская область
АС Новосибирская область
АС Омская область
АС Оренбургская область
АС Орловская область
АС Пензенская область
АС Пермский край
АС Республика Татарстан
АС Ростовская область
АС Рязанская область
АС Самарская область
АС Саратовская область
АС Свердловская область
АС Смоленская область
АС Ставропольский край
АС Тамбовская область
АС Тверская область
АС Томская область;
АС Тульская область
АС Тюменская область
АС Ульяновская область
АС Челябинская область
АС Ярославская область
АС города Санкт-Петербурга
АС города Севастополя 
АС Республики Крым`,
    },
  },
  getters,
  mutations,
  actions,
});
