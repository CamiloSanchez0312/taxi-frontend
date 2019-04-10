<template >
  <div clas="md-layout">
    <l-map class="map" id="myMap" ref="myMap" :zoom="zoom" :center="center" v-on:click="selectSite">
        <l-tile-layer :url="url"></l-tile-layer>
        <!--<l-marker :lat-lng="markerLatLng" :icon="iconTaxi"></l-marker> -->
        <div>
        <l-marker v-for="(taxi,i) in taxis" :key="i" :lat-lng="taxi.coordenadas" :icon="iconTaxi">
          <l-tooltip>
            <u>Nombre:</u> <b>{{taxi.nombre}}</b>
            <u>Telefono:</u> <b>{{taxi.numero_celular}}</b>
          </l-tooltip>
        </l-marker>
      </div>
      <div> <!--puse los for en dos div distintos porque generaba un error de llaves duplicadas-->
        <l-marker v-for="(favorito,j) in favoritos" :key="j" :lat-lng="favorito.coordenadas" :icon="iconFavorito">
          <l-tooltip>
            <u>Numero:</u> <b>{{favorito.num_favorito}}</b>
            <u>Nombre:</u> <b>{{favorito.nombre}}</b>
          </l-tooltip>
          <l-popup>
            <!--<router-link :to="{ name: 'newfavorite', params: {} }"> -->
              <md-button v-b-modal.modify class="md-raised md-primary" v-on:click.prevent="holi">
                Modificar Favorito
              </md-button>
            <!--</router-link>-->
          </l-popup>
        </l-marker>
        <b-modal id="modify" tittle="Modificar favorito">
          <button> holi </button><!--toca mirar como se acomoda el b-modal-->
        </b-modal>
      </div>
        <l-marker v-if="markerLatLng" :lat-lng="markerLatLng" >
            <l-popup>
              <md-button class="md-icon-button">
                <md-icon>
                  favorite_border
                </md-icon>
              </md-button>
            </l-popup>
        </l-marker>
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
      }),
      iconFavorito:L.icon({
        iconUrl:'static/favorito.png',
        iconSize: [50, 45],
        iconAnchor: [40, 37]
      })
    }
  },
  computed:{
    taxis(){
      return this.$store.getters.getTaxis
    },
    favoritos(){
      return this.$store.getters.getFavoritos
    }
  },
  beforeCreate(){
    this.$store.dispatch('taxis')
    this.$store.dispatch('favoritos')
  },
  methods:{
    selectSite(e){
      //this.positionSelected=[e.latlng.lat, e.latlng.lng]
      this.markerLatLng=[e.latlng.lat,e.latlng.lng]
    },
    consultaTaxis(){
      this.$store.distpatch('taxis')
    },
    holi(){
      console.log('HOLIWI :3');
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
