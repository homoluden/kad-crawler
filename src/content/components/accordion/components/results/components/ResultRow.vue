<template lang="html">
  <section class="results-table-row">
    <div class="table-cell date">
      {{ date }}
      <a v-bind:href="url.href">{{ url.text }}</a>
    </div>
    <div class="table-cell medium">{{ courtName }}</div>
    <div class="table-cell medium">{{ claimant }}</div>
    <div class="table-cell big inn">
      {{ claimantAddress }}
      <span>ИНН: {{ claimantInn }}</span>
    </div>
    <div class="table-cell medium">{{ defendant }}</div>
    <div class="table-cell big inn">
      {{ defendantAddress }}
      <span>ИНН: {{ defendantInn }}</span>
      <button v-if="!contacts" v-on:click="() => this.queryContacts(defendantInn)">Контакты</button>
      <span v-if="contacts">Т.: {{ contacts.phoneNumbers }}</span>
    </div>
  </section>
</template>

<script lang="js">
  import { tabRequests } from '../../../../../../constants/tabs';

  import "../../../../../style.scss";

  export default  {
    name: 'result-row',
    props: [ 'index', 'data' ],
    mounted() {

    },
    data() {
      return {
        contacts: null,
        ...this.$props.data
      }
    },
    methods: {
      queryContacts: function(inn) {
        chrome.runtime.sendMessage(
          {
            request: tabRequests.queryContacts,
            data: { inn }
          }
        );
      },
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
