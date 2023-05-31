import router from './router/router.js';

let template = `
<div>
  <h2>간단한 게시판</h2>
  <router-view></router-view>
</div>
`

new Vue({
  el: '#app',
  template : template,
  router // 약어 == router : router
})
