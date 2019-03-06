<template>
  <div class="kad-crawler--root" :class="{ minimized: this.$store.state.ui.minimized }">
    <button v-on:click="toggleMinimized" class="toggle-root">{{ this.toggleText }}</button>
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
    toggleText() {
      return this.$store.state.ui.minimized ? `<<<` : `>>>`;
    },
  },
  methods: {
    toggleMinimized() {
      this.$store.dispatch(`toggleMinimized`);
    },
  },
};
</script>

<style scoped lang="less">
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
  background-color: rgba(0, 0, 0, 0.315);
  z-index: 2000;

  button.toggle-root {
    width: 100%;
    height: 32px;
  }
}

div.kad-crawler--root.minimized {
  width: 64px;
}
</style>
