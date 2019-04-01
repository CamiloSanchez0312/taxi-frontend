<template>
    <!--<div class="map">
      <Map/>

      <div class="popup" >
        <Login/>
      </div>
    </div> -->

    <div class="app">
      <div>
          <md-button class="md-icon-button" @click="showNav = true">
                <md-icon>menu</md-icon>
          </md-button>
      <md-drawer :md-active.sync="showNav">
          <md-toolbar class="md-transparent" md-elevation="0">
            <span class="md-title">My App name</span>
          </md-toolbar>
          </md-drawer>
          <md-content>
            <router-view> </router-view>
          </md-content>
        </div>

    </div>

</template>

<script>

import Test from './components/test.vue'
import Login from './components/Login.vue'
import Map from './components/map.vue'
import {LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import Register from './components/Sign_up.vue';
import toolbar from './components/toolbar.vue'

export default {

  name: 'App',
  components: {
    Test,
    Login,
    LMap,
    LTileLayer,
    LMarker,
    Map,
    Register,
    toolbar

  },
  data(){
    return {
      showNav : false
      
    }
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
