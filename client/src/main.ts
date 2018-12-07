import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VeeValidate from 'vee-validate';
import './plugins/element.js';
import { createProvider } from './vue-apollo';
import '@/assets/css/tailwind.css'

Vue.config.productionTip = false;
Vue.use(VeeValidate);

new Vue({
  router,
  apolloProvider: createProvider(),
  render: (h) => h(App)
}).$mount('#app');
