<template lang="html">
  <section class="filter-values section-panel-2">
    <h2>ЗНАЧЕНИЯ ФИЛЬТРОВ</h2>
    <h3>Участники</h3>
    <input v-model="$store.state.filterValues.participants" class="selector-input" />
    <h3>Дата (от)</h3>
    <input v-model="$store.state.filterValues.startDate" class="selector-input" />
    <h3>Дата (до)</h3>
    <input v-model="$store.state.filterValues.endDate" class="selector-input" />

    <section class="spacer" />

    <button class="update-filter" v-on:click="updateFilter">ПРИМЕНИТЬ ФИЛЬТР</button>
  </section>
</template>

<script lang="js">
  export default  {
    name: 'filter-values',
    props: [],
    mounted() {

    },
    data() {
      return {

      }
    },
    methods: {
      updateFilter: function() {
        const { selectors, filterValues } = this.$store.state;
        const participant = document.querySelectorAll(selectors.participants)[0];
        const startDate = document.querySelectorAll(selectors.startDate)[0];
        const endDate = document.querySelectorAll(selectors.endDate)[0];
        const court = document.querySelectorAll(selectors.court)[0];
        const submitButton = document.querySelectorAll(selectors.submitButton)[0];

        if (participant) {
          participant.value = filterValues.participants;
        }

        if (startDate) {
          startDate.value = filterValues.startDate;
        }

        if (endDate) {
          endDate.value = filterValues.endDate;
        }

        if (submitButton) {
          submitButton.click();
        }

        if (court) {
          const courtNames = filterValues.courts.split();
          if (courtNames.length) {
            court.value = courtNames[0];
          }
        }
      },
    },
    computed: {

    }
}
</script>

<style scoped lang="scss">
.filter-values {
  .spacer {
    height: 100%;
  }

  .update-filter {
    width: 100%;
    height: 48px;
  }
}
</style>
