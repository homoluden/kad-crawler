<template lang="html">
  <section class="results-table">
    <results-table-header />
    <ul v-if="resultsAvailable" />
    <result-row />
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
  height: 98%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  background-color: rgb(235, 235, 235);
  color: rgb(50, 56, 61);
  border: 1px solid rgb(39, 45, 48);
  border-radius: 5px;
}
</style>
