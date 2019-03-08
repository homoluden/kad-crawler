<template lang="html">
  <section class="results-view" :class="{ visible: this.$store.state.ui.rootExpanded, expanded: this.$store.state.ui.resultsExpanded }">
    <h1>results-view Component</h1>
  </section>
</template>

<script lang="js">
  export default  {
    name: 'results-view',
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
.results-view {
  display: none;
  width: 100%;
  height: 64px;
  background-color: rgba(0, 0, 0, 0.315);

  &.visible {
    display: flex;
  }

  &.expanded {
    height: 100%;
  }
}
</style>
