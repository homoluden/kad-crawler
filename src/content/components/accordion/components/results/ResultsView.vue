<template lang="html">
  <section class="section-panel" :class="{ visible: this.$store.state.ui.rootExpanded, expanded: this.$store.state.ui.resultsExpanded }">
    <h1>РЕЗУЛЬТАТЫ</h1>
    <results-table />
  </section>
</template>

<script lang="js">
  import ResultsTable from "./components/ResultsTable";

  import "../../../../style.scss";

  export default  {
    name: 'results-view',
    props: [],

    components: {
      ResultsTable,
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

    }
}
</script>

<style scoped lang="scss">
.section-panel {
}
</style>
