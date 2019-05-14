<template lang="html">
  <section class="results-table">
    <results-table-header />
    <ul v-if="resultsAvailable">
      <li is="result-row" v-for="(result, index) in $store.state.filteredResults" v-bind:key="result.url.text" v-bind:index="index" v-bind:data="result" />
    </ul>
  </section>
</template>

<script lang="js">
  import ResultsTableHeader from "./ResultsTableHeader";
  import ResultRow from "./ResultRow";

  export default  {
    name: 'results-table',
    props: [],

    components: {
      ResultsTableHeader,
      ResultRow,
    },

    mounted() {

    },
    data() {
      return {

      }
    },
    methods: {

    },
    computed: {
      resultsAvailable: function() {
        return !!this.$store.state.results.length;
      }
    }
}
</script>

<style scoped lang="scss">
.results-table {
  margin: 1%;
  width: 98%;
  height: calc(98% - 60px);
  display: flex;
  flex-direction: column;
  justify-content: start;
  background-color: rgb(235, 235, 235);
  color: rgb(50, 56, 61);
  border: 1px solid rgb(39, 45, 48);
  border-radius: 5px;

  ul {
    overflow-y: overlay;
  }
}
</style>
