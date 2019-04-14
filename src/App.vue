<template>
    <!--<div class="map">
      <Map/>

      <div class="popup" >
        <Login/>
      </div>
    </div> -->

    <div class="app">
      <md-toolbar class="md-transparent">
      <md-button id="navButton" class="md-fixed" @click="showNav = true">
            <md-icon>menu</md-icon>
      </md-button>
      </md-toolbar>
      <md-drawer class="drawer" :md-active.sync="showNav">
        <md-toolbar class="md-transparent" md-elevation="0">
          <span class="md-title">My App name</span>
        </md-toolbar>
        <md-list>
          <md-list-item v-if="!currentUser">
            <router-link :to="{ name: 'Login', params: {} }">
              <md-button class="md-primary">login</md-button>
            </router-link>
          </md-list-item>
          <md-list-item v-if="!currentUser">
            <router-link :to="{ name: 'register', params: {} }">
              <md-button class="md-primary">register</md-button>
            </router-link>
          </md-list-item>
          <md-list-item v-if="currentUser">
            <router-link :to="{ name: 'map', params: {} }">
              <md-button class="md-primary">Mapa</md-button>
            </router-link>
          </md-list-item>
          <md-list-item v-if="!currentUser">
            <router-link :to="{ name: 'test', params: {} }">
              <md-button class="md-primary">test</md-button>
            </router-link>
          </md-list-item>
          <md-list-item v-if="currentUser">
            <router-link :to="{ name: 'profile', params: {} }">
              <md-button class="md-primary">Perfil</md-button>
            </router-link>
          </md-list-item>
          <md-list-item v-if="currentUser">
            <router-link :to="{ name: 'favoritos', params: {} }">
              <md-button class="md-primary">Favoritos</md-button>
            </router-link>
          </md-list-item>
          <md-list-item v-if="currentUser">
              <md-button v-on:click="logout" class="md-primary">Salir</md-button>
          </md-list-item>
        </md-list>
          </md-drawer>
          <md-content>
            <router-view>
            </router-view>
            </md-content>


    </div>

</template>

<script>

import Test from './components/test.vue'
import Login from './components/Login.vue'
import Map from './components/map.vue'
import Profile from './components/profile.vue'
import {LMap, LTileLayer, LMarker } from 'vue2-leaflet';

import Register from './components/Sign_up.vue';
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
    Register
  },

  data(){
    return {
      showNav : false

    }
  },
  computed: {
    ...mapGetters({currentUser:'currentUser'}),
    loadMap(){

    },
    logueado(){
      this.$store.getters.user
    }
  },
  updated(){
    //this.checkCurrentLogin() //genere un bug ni el hijueputa
  },
  created(){
    this.checkCurrentLogin() // para facilitar las pruebas en el desarrollo
  },
  methods: {
    checkCurrentLogin(){
      if (!this.currentUser && this.$route.path !== '/' &&  this.$route.path !== '/register') {
        this.$router.push('/?redirect=' + this.$route.name) //cuando se intenta acceder a una ruta sin estar logueado, lo redirige a '/' y cuando se loguea lo manda a dicha ruta
      }
    },
    logout(){
      delete localStorage.token
      this.$store.dispatch('logout')
      this.$router.push({name:'Login'})
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
},
#navButton{
  z-index: 1000;
  position: fixed;
},
.drawer{
  padding: 50;
  margin: 50;
  z-index: 10000;
},
.md-content{
  z-index: 0;
  padding-top: 10%;
  position: fixed;
}

</style>
