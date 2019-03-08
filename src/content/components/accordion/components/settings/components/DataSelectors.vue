<template lang="html">
  <section class="data-selectors section-panel-2">
    <h2>СЕЛЕКТОРЫ ФИЛЬТРОВ и ДАННЫХ</h2>
    <h3>Участники</h3>
    <input v-model="$store.state.selectors.participants" class="selector-input" />
    <h3>Суды</h3>
    <input v-model="$store.state.selectors.court" class="selector-input" />
    <h3>Дата (от)</h3>
    <input v-model="$store.state.selectors.startDate" class="selector-input" />
    <h3>Дата (до)</h3>
    <input v-model="$store.state.selectors.endDate" class="selector-input" />
    <h3>Ссылка на детали дела</h3>
    <input v-model="$store.state.selectors.detailsPage" class="selector-input" />
    <h3>Кнопка "Найти"</h3>
    <input v-model="$store.state.selectors.submitButton" class="selector-input" />
  </section>
</template>

<script lang="js">

  import "../../../../../style.scss";

  export default  {
    name: 'data-selectors',
    props: [],
    mounted() {

    },
    data() {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}
</script>

<style scoped lang="scss">
.data-selectors {
  width: 500px;

  .selector-input {
    width: 100%;
  }
}
</style>
