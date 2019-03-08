<template lang="html">
  <section class="filter-values section-panel-2">
    <h2>ЗНАЧЕНИЯ ФИЛЬТРОВ</h2>
    <h3>Участники</h3>
    <input v-model="$store.state.filterValues.participants" class="selector-input" />
    <h3>Дата (от)</h3>
    <input v-model="$store.state.filterValues.startDate" class="selector-input" />
    <h3>Дата (до)</h3>
    <input v-model="$store.state.filterValues.endDate" class="selector-input" />

    <section class="spacer" />

    <button class="update-filter">ПРИМЕНИТЬ ФИЛЬТР</button>
  </section>
</template>

<script lang="js">
  export default  {
    name: 'filter-values',
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
.filter-values {
  .spacer {
    height: 100%;
  }

  .update-filter {
    width: 100%;
    height: 48px;
  }
}
</style>
