<template lang="html">
  <section class="results-table-row">
    <div class="table-cell date">
      {{ data.date }}
      <a v-bind:href="data.url.href">{{ data.url.text }}</a>
    </div>
    <div class="table-cell medium">{{ data.courtName }}</div>
    <div class="table-cell medium">{{ data.claimant }}</div>
    <div class="table-cell big inn">
      {{ data.claimantAddress }}
      <span>ИНН: {{ data.claimantInn }}</span>
    </div>
    <div class="table-cell medium">{{ data.defendant }}</div>
    <div class="table-cell big inn">
      {{ data.defendantAddress }}
      <span>ИНН: {{ data.defendantInn }}</span>
    </div>
  </section>
</template>

<script lang="js">

  import "../../../../../style.scss";

  export default  {
    name: 'result-row',
    props: [ 'index', 'data' ],
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
.table-cell.date,
.table-cell.inn {
  display: flex;
  flex-direction: column;

  span,
  a {
    font-weight: 900;
  }
}
</style>
