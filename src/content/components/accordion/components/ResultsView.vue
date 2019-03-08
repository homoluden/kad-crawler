<template lang="html">
  <section class="section-panel" :class="{ visible: this.$store.state.ui.rootExpanded, expanded: this.$store.state.ui.resultsExpanded }">
    <h1>РЕЗУЛЬТАТЫ</h1>
  </section>
</template>

<script lang="js">
  import "../../../style.scss";

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
.section-panel {
}
</style>
