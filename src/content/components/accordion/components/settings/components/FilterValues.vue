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
        const participant = document.querySelector(selectors.participants);
        const court = document.querySelector(selectors.court);
        const addCourt = document.querySelector(selectors.addCourt);
        const startDate = document.querySelector(selectors.startDate);
        const endDate = document.querySelector(selectors.endDate);
        const submitButton = document.querySelector(selectors.submitButton);

        if (participant) {
          participant.value = filterValues.participants;
        }

        if (startDate) {
          startDate.value = filterValues.startDate;
        }

        if (endDate) {
          endDate.value = filterValues.endDate;
        }

        if (court) {
          const courtNames = filterValues.courts.split(`\n`).map(dirtyName => dirtyName.trim());
          const timer = setInterval(() => {
            if (!courtNames.length) {
              clearInterval(timer);
              if (submitButton) {
                submitButton.click();
              }
              return;
            }

            const name = courtNames.shift();
            if (addCourt) {
              court.value = name;
              addCourt.click();
            }
          }, 250);
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
