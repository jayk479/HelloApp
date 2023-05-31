import myheader from './components/header.js';
import router from './router/router.js';

let template = `
<div>
  <my-header v-on:update-data="updateDataArray" 
             v-bind:dataList="dataArray"></my-header>
  <router-view></router-view>
</div>
`

new Vue({
  el: '#app',
  data: {
    dataArray: []
  },
  components: {
    'my-header': myheader
  },
  template: template,
  methods: {
    updateDataArray: function (inputData) {
      this.dataArray = inputData;
    },
    getDataArray : function(){
      return this.dataArray['board'];
    },
    setDataArray : function(boardList){
      this.dataArray['board'] = boardList;
    } // 데이터 가져오거나 변경 할 경우 getter setter를 기반으로ㅇㅇ
  },
  router // 약어 == router : router
})