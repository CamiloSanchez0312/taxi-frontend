<template >
  <div clas="md-layout">
    <l-map class="map" id="myMap" ref="myMap" :zoom="zoom" :center="center" v-on:click="selectSite">
        <l-tile-layer :url="url"></l-tile-layer>
        <!--<l-marker :lat-lng="markerLatLng" :icon="iconTaxi"></l-marker> -->
        <l-marker v-for="(taxi,i) in taxis" :key="i" :lat-lng="taxi.coordenadas" :icon="iconTaxi">
          <l-tooltip>
            <u>Nombre:</u> <b>{{taxi.nombre}}</b>
            <u>Telefono:</u> <b>{{taxi.numero_celular}}</b>
          </l-tooltip>
        </l-marker>
        <l-marker v-if="markerLatLng" :lat-lng="markerLatLng"> </l-marker>
      </l-map>
      <md-button class="md-fab" >
        <md-icon>my_location</md-icon>
      </md-button>
      </div>
</template>

<script>

import {LMap, LTileLayer, LMarker,LPopup,LTooltip} from 'vue2-leaflet';
import {mapGetters} from 'vuex'
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip
  },
  data(){
    //https://korigan.github.io/Vue2Leaflet/#/components/l-map/
    return{
      url:'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png',
      zoom:13,
      center:[3.42158, -76.5205],
      markerLatLng: null,
      urlocation: null,
      iconTaxi:L.icon({
        iconUrl:'static/taxi.png',
        iconSize: [50, 45],
        iconAnchor: [40, 37]
      })
    }
  },
  computed:{
    taxis(){
      return this.$store.getters.getTaxis
    }
  },
  beforeCreate(){
    this.$store.dispatch('taxis')
  },
  methods:{
    selectSite(e){
      //this.positionSelected=[e.latlng.lat, e.latlng.lng]
      this.markerLatLng=[e.latlng.lat,e.latlng.lng]
    },
    consultaTaxis(){
      this.$store.distpatch('taxis')
    }
  },
  mounted () {
      this.$nextTick(() => {
        this.$refs.myMap.mapObject.locate({enableHighAccuracy: true});
        this.$refs.myMap.mapObject.on('locationfound', e =>{
          console.log(e);
          this.urlocation= [e.latitude, e.longitude]

  });
      })
    }
}
</script>

<style lang="scss">
.map {
  height:90% ;
  width: 100%;
  top: 10% ;
  position: fixed;
  padding: 10%;
  margin: 0;
  z-index: 0;
  padding-top: 50px;
}
.md-fab {
z-index: 1;
position: fixed;
left: 92%;
bottom: 5%;
}
</style>
