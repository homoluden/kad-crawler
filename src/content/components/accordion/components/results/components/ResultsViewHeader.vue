<template lang="html">
  <section class="results-view-header">
    <div></div>
    <h1>РЕЗУЛЬТАТЫ ({{ resultCount }})</h1>
    <div class="buttons">
      <button v-on:click="filterByCitySumm">Фильтр по городам</button>
      <button v-on:click="filterByIssueSumm">Фильтр по сумме</button>
      <button v-on:click="requestDefendantContacts">Контакты Ответчиков</button>
      <button v-on:click="filterByPhoneSumm">Фильтр по тел-ам</button>
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
        const { results } = this.$store.state;

        const claimLinks = results.filter(r => !r.url.claimSum ).map(r => {
          const { url } = r;
          const lnk = {...url};
          lnk.href = lnk.href.replace(`/Card/`, `/PrintCard/`);
          return lnk;
        });
        const filterTimer = setInterval(() => {
          const claimLink = claimLinks.shift();
          if (!claimLink) {
            clearInterval(filterTimer);
            return;
          }

          const headers = new Headers({
            "Accept": "application/json, text/javascript, */*",
            "X-Requested-With": "XMLHttpRequest"
          })
          fetch(claimLink.href, { headers })
            .then(res => res.json())
            .then((claimResponse) => {
              const { Result } = claimResponse || {};
              const { ClaimSum } = Result;
              if (ClaimSum && ClaimSum > 300000) {
                this.$store.dispatch(`setClaimSum`, { claimId: claimLink.text, claimSum: ClaimSum });
              } else {
                this.$store.dispatch(`deleteClaim`, { claimId: claimLink.text });
              }
            },
            (err) => {
              clearInterval(filterTimer);
              console.warn(`[Filter by Sum] Error:\n`, err);
              alert(`Запрос суммы дела отвергнут. Откройте любое дело в новой вкладке и введите капчу. После успешного завершения проверки снова запустите фильтр по сумме дела.`);
            });
        }, 7100);
      },
      filterByPhoneSumm() {
        this.$store.dispatch(`removeEmptyPhones`);
      },
      filterByCitySumm() {
        this.$store.dispatch(`removeSameCity`);
      },
      requestDefendantContacts() {
        this.$store.dispatch(`requestDefendantContacts`);
      },
      uploadDefendants() {
        this.$store.dispatch(`uploadDefendants`);
      },
    },
    computed: {
      resultCount: function() {
        const { filteredResults } = this.$store.state;
        return filteredResults.length;
      }
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
