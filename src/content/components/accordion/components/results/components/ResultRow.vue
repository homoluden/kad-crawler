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
      <button v-if="!$props.data.claimantContacts" v-on:click="() => this.queryContacts($props.data.claimantInn)">Контакты</button>
      <span v-if="$props.data.claimantContacts"> Рук: {{ $props.data.claimantContacts.head }} </span>
      <span v-if="$props.data.claimantContacts"> Т.: {{ $props.data.claimantContacts.phoneNumbers }} </span>
      <span v-if="$props.data.claimantContacts"> Email: {{ $props.data.claimantContacts.email }} </span>
    </div>
    <div class="table-cell medium">{{ defendant }}</div>
    <div class="table-cell big inn">
      {{ defendantAddress }}
      <span>ИНН: {{ defendantInn }}</span>
      <button v-if="!$props.data.defendantContacts" v-on:click="() => this.queryContacts($props.data.defendantInn)">Контакты</button>
      <span v-if="$props.data.defendantContacts"> Рук: {{ $props.data.defendantContacts.head }} </span>
      <span v-if="$props.data.defendantContacts"> Т.: {{ $props.data.defendantContacts.phoneNumbers }} </span>
      <span v-if="$props.data.defendantContacts"> Email: {{ $props.data.defendantContacts.email }} </span>
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
    updated: function () {
      this.$nextTick(function () {
        console.info(`[ResultRow] Updated. `, { props: this.$props });
      })
    },
    data() {
      return {
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
