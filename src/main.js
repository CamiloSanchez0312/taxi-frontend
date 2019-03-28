// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResourse from 'vue-resource'
import VueRouter from 'vue-router'
import {LMap, LTileLayer, LMarker} from 'vue2-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import VueMaterial from 'vue-material'
import '../node_modules/vue-material/dist/vue-material.min.css'
import '../node_modules/vue-material/dist/theme/default.css'
import Axios from './backend/vue-axios/axios.js'
import router from './router'

Vue.use(VueMaterial);


Vue.config.productionTip = false
Vue.use(VueResourse);
Vue.use(VueRouter);
Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);

// this part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl;
// this part resolve an issue where the markers would not appear
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  Axios
})
