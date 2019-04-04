<template lang="html">
  <section class="results-view-header">
    <div></div>
    <h1>РЕЗУЛЬТАТЫ</h1>
    <div class="buttons">
      <button v-on:click="filterByIssueSumm">Фильтр по сумме</button>
      <button v-on:click="requestDefendantContacts">Контакты Ответчиков</button>
      <button v-on:click="uploadDefendants">Выгрузить ответчиков</button>
    </div>
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
      filterByIssueSumm() {
        alert(`Фильтр по сумме заказов ещё не реализован!`);
      },
      requestDefendantContacts() {
        this.$store.dispatch(`requestDefendantContacts`);
      },
      uploadDefendants() {
        this.$store.dispatch(`uploadDefendants`);
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

  & > div.buttons {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
