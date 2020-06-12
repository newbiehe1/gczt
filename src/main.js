import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import H from './assets/js/library'

Vue.prototype.$H = H;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
