import Vue from 'vue'
import App from './App.vue'
import ClipboardJS from 'clipboard'

Vue.config.productionTip = false
Vue.prototype.$version = process.env.VUE_APP_VERSION

new ClipboardJS('.clip')

new Vue({
  render: h => h(App),
}).$mount('#app')
