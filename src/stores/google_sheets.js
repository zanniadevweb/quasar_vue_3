import { defineStore } from 'pinia';
import axios from 'axios';

const toObject = (arr, headers) => {
  var rv = {};
  for (var i = 0; i < arr.length; ++i)
    rv[headers[i]] = arr[i];
  return rv;
}

export const googleSheetStore = defineStore('google_sheets', {
  state: () => ({
    info: [],
    apiData: []
  }),
  getters: {
    // TODO
  },
  actions: {
    async fetchRows() {
      try {
          // const fetchedData = await axios.get('https://jsonplaceholder.typicode.com/users')
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
                  if (key == 0) {
                    var headers = value
                    headers.shift()
                    headers.unshift('name')
                  } else {
                    this.info.push(toObject(value, headers))
                  }
                }
            });
            this.apiData = this.info
        }
        catch (error) {
          alert(error)
          console.log(error)
      }
    }
  }
});
