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
      domObserver: null,
    },
    selectors: {
      participants: `#sug-participants > div > textarea`,
      court: `#caseCourt input[type=text]`,
      addCourt: `#caseCourt > div > i.b-icon--courts.add`,
      startDate: `#sug-dates > label.from > input`,
      endDate: `#sug-dates > label.to > input`,
      submitButton: `#b-form-submit > div > button`,
      dataQueries: {
        resultsContainer: () => {
          return document.querySelector('#main-column2 > div.b-results');
        },
        date: () => {
          return [...document.querySelectorAll('#b-cases > tbody > tr > td.num > div > div > span')].map(elm => elm.innerText.trim());
        },

        issueDetailsUrl: () => {
          return [...document.querySelectorAll('#b-cases > tbody > tr > td.num > div > a')].map(elm => elm.href);
        },
        courtName: () => {
          return [...document.querySelectorAll('#b-cases > tbody > tr > td.court > div > div:nth-child(2)')].map(elm => elm.innerText.trim());
        },
        claimant: () => {
          return [...document.querySelectorAll('#b-cases > tbody > tr > td.plaintiff > div > div > span')].map(elm => elm.innerText.trim());
        },
        claimantAddress: () => {
          return [...document.querySelectorAll('#b-cases > tbody > tr > td.plaintiff > div > div > span > span')].map(elm => (elm.innerText.split(`\n`)[1] || ``).trim());
        },

        claimantInn: () => {
          return [...document.querySelectorAll('#b-cases > tbody > tr > td.plaintiff > div > div > span > span > div')].map(elm => elm.innerText.trim().replace(`ИНН: `, ``));
        },
        defendant: () => {
          return [...document.querySelectorAll('#b-cases > tbody > tr > td.respondent > div > div > span')].map(elm => elm.innerText.trim());
        },
        defendantAddress: () => {
          return [...document.querySelectorAll('#b-cases > tbody > tr > td.respondent > div > div > span > span.js-rolloverHtml')].map(elm =>
            (elm.innerText.split(`\n`)[1] || ``).trim()
          );
        },
        defendantInn: () => {
          return [...document.querySelectorAll('#b-cases > tbody > tr > td.respondent > div > div > span > span.js-rolloverHtml > div')].map(elm =>
            elm.innerText.trim().replace(`ИНН: `, ``)
          );
        },
      },
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
