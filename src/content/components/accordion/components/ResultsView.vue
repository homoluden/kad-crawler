<template lang="html">
  <section class="results-view" :class="{ minimized: this.$store.state.ui.minimized }">
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
  display: flex;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.315);

  &.minimized {
    display: none;
  }
}
</style>
