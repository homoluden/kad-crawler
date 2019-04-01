<template>
  <div class="kad-crawler--root" :class="{ minimized: !this.$store.state.ui.rootExpanded }">
    <button v-on:click="toggleRoot" class="toggle-root">{{ this.buttonTest }}</button>
    <accordion />
  </div>
</template>

<script>
import Accordion from './components/accordion';

export default {
  name: 'App',
  components: {
    Accordion,
  },
  computed: {
    buttonTest() {
      return !this.$store.state.ui.rootExpanded ? `<<<` : `>>>`;
    },
  },
  mounted() {
    const buttonContainer = document.querySelector(`#main-column1 > div.b-form-submitters`);
    const searchButton = document.querySelector(`#b-form-submit > div > button`);
    if (buttonContainer && searchButton) {
      const newButton = searchButton.cloneNode();
      newButton.innerText = `Автопоиск`;
      newButton.addEventListener(`click`, this.startSearch);
      buttonContainer.insertBefore(newButton, buttonContainer.firstChild);
    }
  },
  methods: {
    startSearch() {
      this.$store.dispatch(`applyFilter`);
    },
    toggleRoot() {
      this.$store.dispatch(`toggleRoot`);
    },
  },
};
</script>

<style scoped lang="scss">
div.kad-crawler--root {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  position: fixed;
  width: 100vw;
  height: 100%;
  max-height: 100vh;
  top: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 2000;

  &.minimized {
    width: 64px;
  }

  button.toggle-root {
    width: 100%;
    height: 32px;
  }
}
</style>
