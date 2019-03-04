<template>
  <div class="kad-crawler--root" v-bind:class="{ minimized: this.$store.state.ui.minimized }">
    <button v-on:click="toggleMinimized" class="toggle-root">{{ this.toggleText }}</button>
    <p>Hello world!</p>
  </div>
</template>

<script>
export default {
  name: 'App',
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
  position: fixed;
  width: 500px;
  height: 100vh;
  top: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.315);
  z-index: 100;

  p {
    font-size: 20px;
  }

  button.toggle-root {
    width: 100%;
  }
}

div.kad-crawler--root.minimized {
  width: 64px;

  p {
    display: none;
  }
}
</style>
