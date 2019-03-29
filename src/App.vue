<template>
    <!--<div class="map">
      <Map/>

      <div class="popup" >
        <Login/>
      </div>
    </div> -->
    <div class="app">

      <router-view> </router-view>
    </div>

</template>

<script>

import Test from './components/test.vue'
import Login from './components/Login.vue'
import Map from './components/map.vue'
import {LMap, LTileLayer, LMarker } from 'vue2-leaflet';

export default {

  name: 'App',
  components: {
    Test,
    Login,
    LMap,
    LTileLayer,
    LMarker,
    Map

  },
  computaded: {
    loadMap(){

    }
  },
  updated () {
  if (!localStorage.token && this.$route.path !== '/') {
    this.$router.push('/?redirect=' + this.$route.path)
  }}

}
</script>

<style >
.popup{
  z-index:  400;
  position: relative;
  height:100% ;
  width: 100%;
  top: 0 ;
  padding: 0%;
  margin: 0%;


},
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
