<template lang="html">
  <section class="results-view-header">
    <div></div>
    <h1>РЕЗУЛЬТАТЫ</h1>
  </section>
</template>

<script lang="js">
  export default  {
    name: 'results-view-header',
    props: [],
    mounted() {

    },
    data() {
      return {

      }
    },
    methods: {
      loadMainData: function() {
        this.$store.dispatch(`applyFilter`);
      },
    },
    computed: {

    }
}
</script>

<style scoped lang="scss">
.results-view-header {
  display: flex;
  justify-content: space-between;
  width: 100%;

  & > * {
    width: 100%;
  }

  & > h1 {
    text-align: center;
  }
}
</style>
