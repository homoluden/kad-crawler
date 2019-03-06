<template lang="html">
  <section class="accordion" :class="{ minimized: this.$store.state.ui.minimized }">
    <button class="view-toggle">
      <table-large />
    </button>

    <results-view />

    <button class="view-toggle">
      <settings-outline />
    </button>
    <settings-view />
  </section>
</template>

<script lang="js">
  import TableLarge from "icons/TableLarge";
  import SettingsOutline from "icons/SettingsOutline";
  import ResultsView from "./components/ResultsView";
  import SettingsView from "./components/SettingsView";

  export default  {
    name: 'accordion',
    props: [],

    components: {
      TableLarge,
      SettingsOutline,
      ResultsView,
      SettingsView,
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
.accordion {
  width: 100%;
  height: 100%;
  margin-top: 0;
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
}

.view-toggle {
  width: 64px - 6px;
  height: 64px - 6px;
  margin-top: 3px;
  margin-left: 3px;
}
</style>
