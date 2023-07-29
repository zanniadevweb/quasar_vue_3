<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat
               dense
               round
               icon="menu"
               aria-label="Menu"
               @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen"
              show-if-above
              bordered>
      <q-list>
        <q-item-label header>
          Essential Links
        </q-item-label>

        <EssentialLink v-for="link in essentialLinks"
                       :key="link.title"
                       v-bind="link" />
      </q-list>
    </q-drawer>

<!--    <section v-if="errored">
      <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
    </section>

    <section v-else>
      <div v-if="loading">Loading...</div>

      <div v-else
           v-for="currency in info"
           class="currency">
        {{ currency.description }}:
        <span class="lighten">
          <span v-html="currency.symbol"></span>{{ currency.rate_float | currencydecimal }}
        </span>
      </div>

    </section>-->

    <div class="q-pa-md">
      <q-table title="Treats"
               :rows="rows"
               :columns="columns"
               row-key="name" />
    </div>
    <div hidden="hidden">toto{{ store.data }}</div>


    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// ----- DECLARE IMPORTS BELOW HERE ----
import { defineComponent, ref } from 'vue'
import { useCounterStore } from 'stores/counter'; // Quasar (Pinia) Doc. Store + State Management : https://quasar.dev/quasar-cli-vite/state-management-with-pinia
import EssentialLink from 'components/EssentialLink.vue'
import axios from 'axios';
// ----- DECLARE IMPORTS ABOVE HERE ----

// ----- DECLARE FUNCTIONS BELOW HERE ----

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

const toObject = (arr, headers) => {
  var rv = {};
  for (var i = 0; i < arr.length; ++i)
    rv[headers[i]] = arr[i];
  return rv;
}

// ----- DECLARE FUNCTIONS ABOVE HERE ----

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const store = useCounterStore();
    const leftDrawerOpen = ref(false)

    return {
      store,
      rows: [],
      info: [],
      headers: [],
      columns: [ // array of Objects
        // column Object definition
        {
          // unique id
          // identifies column
          // (used by pagination.sortBy, "body-cell-[name]" slot, ...)
          name: 'desc',

          // label for header
          label: 'Aliment végétal',

          // row Object property to determine value for this column
          field: 'name',
          // OR field: row => row.some.nested.prop,

          // (optional) if we use visible-columns, this col will always be visible
          required: true,

          // (optional) alignment
          align: 'left',

          // (optional) tell QTable you want this column sortable
          sortable: true,

          // (optional) compare function if you have
          // some custom data or want a specific way to compare two rows
          sort: (a, b, rowA, rowB) => parseInt(a, 10) - parseInt(b, 10),
          // function return value:
          //   * is less than 0 then sort a to an index lower than b, i.e. a comes first
          //   * is 0 then leave a and b unchanged with respect to each other, but sorted with respect to all different elements
          //   * is greater than 0 then sort b to an index lower than a, i.e. b comes first

          // (optional) override 'column-sort-order' prop;
          // sets column sort order: 'ad' (ascending-descending) or 'da' (descending-ascending)
          sortOrder: 'ad', // or 'da'

          // (optional) you can format the data with a function
          format: (val, row) => `${val}`,
          // one more format example:
          // format: val => val
          //   ? /* Unicode checkmark checked */ "\u2611"
          //   : /* Unicode checkmark unchecked */ "\u2610",

          // body td:
          // style: 'width: 500px',
          // or as Function --> style: row => ... (return String/Array/Object)
          classes: 'my-special-class',
          // or as Function --> classes: row => ... (return String)

          // header th:
          // headerStyle: 'width: 500px',
          headerClasses: 'my-special-class'
        },
        { name: 'Famille', label: 'Famille', field: 'Famille', sortable: true },
        { name: 'Type', label: 'Type', field: 'Type' },
        { name: 'Quantité', label: 'Quantité', field: 'Quantité' },
        { name: 'Image', label: 'Image', field: 'Image' }
        // ,{ name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        // { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      ],
      // rows: [
      //   {
      //     name: 'Aliment Végétal',
      //     Alimentvegetal: 'Frozen Yogurt',
      //     Famille: 159,
      //     Type: 6.0,
      //     Quantité: 24,
      //     Image: 4.0
      //   },
      //   {
      //     name: 'Aliment Végétal',
      //     Alimentvegetal: 'Ice cream sandwich',
      //     Famille: 237,
      //     Type: 9.0,
      //     Quantité: 37,
      //     Image: 4.3
      //   }
      // ],
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  // ----- DECLARE METHODS BELOW HERE ----
  methods: {
    // async getApiData() {
    //     await axios
    //     .get('https://api.coindesk.com/v1/bpi/currentprice.json')
    //     .then(response => {
    //           let json = response.data.bpi
    //           for (const [key, value] of Object.entries(json)) {
    //             let val = JSON.stringify(value)
    //             this.info[key] = value
    //           }
    //       });
    //       console.log(this.info.EUR)
    // }
    async getApiData() {
        var tab_name = 'FruitsAndVegetables';
        var spreadsheet_id = '19ThQQtvlXImQx2OC3D_pSrNQkx5Mmx4q0MxLkuI3elw';
        var api_key = 'AIzaSyBW2cIc-aegzxLzbEyzmtgKX-9kCfhmO5M';
        var url = 'https://sheets.googleapis.com/v4/spreadsheets/' +
           spreadsheet_id + '/values/' + tab_name +
           '?alt=json&key=' + api_key;
        await axios
        .get(url)
        .then(response => {
              let json = response.data.values
              for (const [key, value] of Object.entries(json)) {
                // let val = JSON.stringify(value)
                if (key == 0) {
                  var headers = value
                  headers.shift()
                  headers.unshift('name')
                } else {
                  this.info.push(toObject(value, headers))
                }
              }
          });
          // console.log(this.columns)
          console.log(this.store)
          this.store.data = this.info
          this.rows = this.store.data
          // console.log(this.store)
          this.headers = this.info[0];
          // console.log(this.info)
          // console.log(this.rows)
    }
  },
  // ----- DECLARE METHODS ABOVE HERE ----
  mounted() {
    this.getApiData();
  }
})

</script>
