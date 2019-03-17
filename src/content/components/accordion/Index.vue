<template lang="html">
  <section class="accordion" :class="{ minimized: !this.$store.state.ui.rootExpanded }">
    <button class="view-toggle" v-on:click="toggleResults">
      <table-large />
    </button>

    <results-view />

    <button class="view-toggle" v-on:click="toggleSettings">
      <settings-outline />
    </button>
    <settings-view />
  </section>
</template>

<script lang="js">
  import TableLarge from "icons/TableLarge";
  import SettingsOutline from "icons/SettingsOutline";
  import ResultsView from "./components/results/ResultsView";
  import SettingsView from "./components/settings/SettingsView";

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
      toggleResults() {
        this.$store.dispatch(`toggleResults`);
      },
      toggleSettings() {
        this.$store.dispatch(`toggleSettings`);
      },
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

  .view-toggle {
    width: 64px - 6px;
    height: 64px - 6px;
    margin: 3px 10px;
  }

  &.minimized .view-toggle {
    margin: 3px 3px;
  }
}
</style>
