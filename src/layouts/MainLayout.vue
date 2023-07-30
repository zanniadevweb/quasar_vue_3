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

        <EssentialLink v-for="link in menu"
                       :key="link.title"
                       v-bind="link" />
      </q-list>
    </q-drawer>

    <div class="q-pa-md">
      <q-table title="Treats"
               :rows="rows"
               :columns="columns"
               row-key="name" />
    </div>
    <div hidden="hidden">toto{{ storeGoogleSheet.data }}</div>


    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// ----- DECLARE IMPORTS BELOW HERE ----
import { defineComponent, ref } from 'vue'
import { googleSheetStore } from 'stores/google_sheets';
import { menuStore } from 'stores/menu';
import EssentialLink from 'components/EssentialLink.vue'
import axios from 'axios';
// ----- DECLARE IMPORTS ABOVE HERE ----

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const storeGoogleSheet = googleSheetStore();
    const storeMenu = menuStore();
    const leftDrawerOpen = ref(false)

    return {
      storeGoogleSheet,
      storeMenu,
      menu: [],
      rows: [],
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
        { name: 'Type', label: 'Type', field: 'Type', sortable: true },
        { name: 'Quantité', label: 'Quantité', field: 'Quantité', sortable: true },
        { name: 'Image', label: 'Image', field: 'Image', sortable: true }
      ],
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  // ----- DECLARE METHODS BELOW HERE ----
  methods: {
    // TODO
  },
  // ----- DECLARE METHODS ABOVE HERE ----
  created() {
    this.menu = this.storeMenu.linksList
 },
  mounted() {
    this.storeGoogleSheet.fetchRows().then( response => {
        this.rows = this.storeGoogleSheet.apiData
      }
    )
  }
})

</script>
