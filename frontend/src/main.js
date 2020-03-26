import Vue from 'vue';
import Buefy from 'buefy';
import moment from 'moment';
import App from './App.vue';
import router from './router';
import 'buefy/dist/buefy.css';

Vue.use(Buefy);

Vue.config.productionTip = false;

Vue.filter('formatDate', (value) => {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm');
  }
  return null;
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
