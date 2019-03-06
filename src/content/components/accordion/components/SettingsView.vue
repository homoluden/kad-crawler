<template lang="html">
  <section class="settings-view" :class="{ minimized: this.$store.state.ui.minimized }">
    <h1>settings-view Component</h1>
  </section>
</template>

<script lang="js">
  export default  {
    name: 'settings-view',
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
.settings-view {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.315);

  &.minimized {
    display: none;
  }
}
</style>
