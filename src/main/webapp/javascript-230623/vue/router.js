const routes = [{
  path: '/product',
  component: Vue.defineAsyncComponent(() => loadModule('./product.vue', options))
},
{
  path: '/login',
  component: Vue.defineAsyncComponent(() => loadModule('./signin.vue', options))
},
{
  path: '/board',
  component: Vue.defineAsyncComponent(() => loadModule('./board.vue', options))
},
{
  path: '/',
  component: Vue.defineAsyncComponent(() => loadModule('./my-main.vue', options))
},
]

const router = VueRouter.createRouter({
history: VueRouter.createWebHashHistory(),
routes,
});