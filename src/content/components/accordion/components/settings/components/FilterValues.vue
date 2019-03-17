<template lang="html">
  <section class="filter-values section-panel-2">
    <h2>ЗНАЧЕНИЯ ФИЛЬТРОВ</h2>
    <h3>Участники</h3>
    <input v-model="$store.state.filterValues.participants" class="selector-input" />
    <h3>Дата От</h3>
    <input v-model="$store.state.filterValues.dateFrom" class="selector-input" />
    <h3>Дата Gj</h3>
    <input v-model="$store.state.filterValues.dateTo" class="selector-input" />

    <section class="spacer" />
  </section>
</template>

<script lang="js">
  export default  {
    name: 'filter-values',
    props: [],
    mounted() {
      this.$store.dispatch(`createDomObserver`);
    },
    data() {
      return {
        domObserver: null,
      }
    },
    methods: {
    },
    computed: {

    }
}
</script>

<style scoped lang="scss">
.filter-values {
  .spacer {
    height: 100%;
  }
}
</style>
