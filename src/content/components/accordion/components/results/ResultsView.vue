<template lang="html">
  <section class="section-panel" :class="{ visible: this.$store.state.ui.rootExpanded, expanded: this.$store.state.ui.resultsExpanded }">
    <results-view-header />
    <results-table />
  </section>
</template>

<script lang="js">
  import ResultsViewHeader from "./components/ResultsViewHeader";
  import ResultsTable from "./components/ResultsTable";

  import "../../../../style.scss";

  export default  {
    name: 'results-view',
    props: [],

    components: {
      ResultsViewHeader,
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
