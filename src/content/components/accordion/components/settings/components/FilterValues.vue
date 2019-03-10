<template lang="html">
  <section class="filter-values section-panel-2">
    <h2>ЗНАЧЕНИЯ ФИЛЬТРОВ</h2>
    <h3>Участники</h3>
    <input v-model="$store.state.filterValues.participants" class="selector-input" />

    <section class="spacer" />

    <button class="update-filter" v-on:click="applyFilter">ПРИМЕНИТЬ ФИЛЬТР</button>
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
      applyFilter: function() {
        this.$store.dispatch(`applyFilter`);
      },
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
