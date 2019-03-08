<template lang="html">
  <section class="section-panel" :class="{ visible: this.$store.state.ui.rootExpanded, expanded: this.$store.state.ui.settingsExpanded }">
    <h1>НАСТРОЙКИ</h1>
    <section class="section-content">
      <data-selectors />
      <court-filter />
    </section>
  </section>
</template>

<script lang="js">
  import DataSelectors from "./components/DataSelectors.vue";
  import CourtFilter from "./components/CourtFilter.vue";

  import "../../../../style.scss";

  export default  {
    name: 'settings-view',
    props: [],
    components: {
      DataSelectors,
      CourtFilter,
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
  .section-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
}
</style>
