<template lang="html">
  <section class="results-table-row header">
    <div class="table-cell">Дело № (дата)</div>
    <div class="table-cell medium">Суд</div>
    <div class="table-cell medium">Истец</div>
    <div class="table-cell big">Адрес истца, ИНН</div>
    <div class="table-cell medium">Ответчик</div>
    <div class="table-cell big">Адрес ответчика, ИНН</div>
  </section>
</template>

<script lang="js">

  import "../../../../../style.scss";

  export default  {
    name: 'results-table-header',
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
.results-table-row.header {
  margin-top: -1px;
  min-height: 26px;
  line-height: 20px;
  font-weight: 900;
}
</style>
