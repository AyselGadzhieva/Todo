import Vue from 'nativescript-vue'
import MainPage from './components/MainPage'
import VueDevtools from 'nativescript-vue-devtools'
import RadDataForm from 'nativescript-ui-dataform/vue';

Vue.use(RadDataForm);

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')


new Vue({
  render: h => h('frame', [h(MainPage)])
}).$start()
