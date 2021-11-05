import Vue from 'vue'
import App from './App.vue'
import router from './router';
import * as d3 from 'd3'
Vue.prototype.d3=d3
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
