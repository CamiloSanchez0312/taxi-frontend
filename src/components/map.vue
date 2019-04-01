<template >

  <div class="map">
    <l-map  id="myMap" ref="myMap" :zoom="zoom" :center="center" v-on:click="selectSite">
        <l-tile-layer :url="url"></l-tile-layer>
        <!--<l-marker :lat-lng="markerLatLng" :icon="iconTaxi"></l-marker> -->
        <l-marker v-for="(taxi,i) in taxis" :key="i" :lat-lng="taxi.coordenadas" :icon="iconTaxi">
          <l-tooltip>
            Nombre {{taxi.nombre}}
            Telefono {{taxi.numero_celular}}
          </l-tooltip>
         </l-marker>
      </l-map>
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
      markerLatLng: L.latLng(3.42158, -76.5205),
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
      this.markerLatLng=[e.latlng.lat,e.latlng.lng]
    },
    consultaTaxis(){
      this.$store.distpatch('taxis')
    }
  }
}
</script>

<style lang="scss">
.map {
  height:100% ;
  width: 100%;
  top: 0 ;
  position: absolute;
  padding: 0%;
  margin: 0%;
}
</style>
