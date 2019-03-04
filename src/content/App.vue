<template>
  <div class="kad-crawler--root">
    <p>Hello world!</p>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
div.kad-crawler--root {
  position: fixed;
  width: 300px;
  height: 100vh;
  top: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.315);
  z-index: 100;
}

p {
  font-size: 20px;
}
</style>
