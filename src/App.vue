<template>
  <div class="map">
    <l-map :zoom=13 :center="[3.42158, -76.5205]">
        <l-tile-layer url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"></l-tile-layer>
      </l-map>

  <section class="Popup" >
  </router-view></router-view>

</section>

</div>

</template>

<script>

import Test from './components/test.vue'
import User from './components/User.vue'
import {LMap, LTileLayer, LMarker } from 'vue2-leaflet';

export default {

  name: 'App',
  components: {
    Test,
    User,
    LMap,
    LTileLayer,
    LMarker

  },
  computaded: {
    loadMap(){

    }
  }
}
</script>

<style>
.Popup{
  z-index:  1000;
  position: relative;

}
.map {
  height:100% ;
  width: 100%;
  top: 0 ;
  position: absolute;
  padding: 0%;
  margin: 0%;
},
#location_button{
  position: fixed;
  top: 600px;
  left: 1300px;

  z-index: 1000;
}

</style>
