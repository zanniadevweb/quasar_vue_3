import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    data: null,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
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
          this.store = this.info
          console.log(this.store)
          this.headers = this.info[0];
          // console.log(this.info)
          // console.log(this.rows)
    }
  },
});
