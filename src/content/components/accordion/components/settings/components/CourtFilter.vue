<template lang="html">
  <section class="court-filter section-panel-2">
    <h1>СУДЫ</h1>
    <textarea class="full-height" v-model="$store.state.filterValues.courts"></textarea>
  </section>
</template>

<script lang="js">
  export default  {
    name: 'court-filter',
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
.court-filter {
}
</style>
