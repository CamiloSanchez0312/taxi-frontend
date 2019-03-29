<template>
    <!--<div class="map">
      <Map/>

      <div class="popup" >
        <Login/>
      </div>
    </div> -->
    <div class="app">
      <template v-if="currentUser">
        <Navbar></Navbar>
      </template>
      <div class="container-fluid">
        <router-view></router-view>
        <template v-if="currentUser">
          <Foot></Foot>
        </template>
      </div>
    </div>

</template>

<script>

import Test from './components/test.vue'
import Login from './components/Login.vue'
import Map from './components/map.vue'
import Foot from '@/components/Foot.vue'
import {LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import { mapGetters } from 'vuex'

export default {

  name: 'App',
  components: {
    Test,
    Login,
    LMap,
    LTileLayer,
    LMarker,
    Map,
    Foot

  },
  computed: {
    ...mapGetters({currentUser:'currentUser'}),
    loadMap(){

    }
  },
  updated(){
    //this.checkCurrentLogin() //genere un bug ni el hijueputa
  },
  created(){
    this.checkCurrentLogin()
  },
  methods: {
    checkCurrentLogin(){
      if (!this.currentUser && this.$route.path !== '/') {
        this.$router.push('/?redirect=' + this.$route.path) //cuando se intenta acceder a una ruta sin estar logueado, lo redirige a '/' y cuando se loguea lo manda a dicha ruta
      }
    }
  }

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
