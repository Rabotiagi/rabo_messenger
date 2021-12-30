import Vue from 'vue';
import App from './App.vue';
import store from './store';
import dotenv from 'dotenv';

dotenv.config();
Vue.config.productionTip = false;

new Vue({
    store,
    render: h => h(App),
}).$mount('#app')
