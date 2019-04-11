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
              <md-button @click="showDialogMod=true" v-on:click="modfavorite.numFav=favorito.num_favorito" class="md-raised md-primary" >
                Modificar Favorito
              </md-button>
          </l-popup>
        </l-marker>
        <!--<b-modal id="modify" tittle="Modificar favorito">
          <button> holi </button> //toca mirar como se acomoda el b-modal
        </b-modal>-->
        <!--<div>
        <md-dialog :md-active.sync="showDialog">
          <md-dialog-title>Modificar Favorito</md-dialog-title>
          <md-field>
            <label>Nuevo nombre:</label>
            <md-input name="Nombre:" id="newNomFav" placeholder="Nuevo nombre" v-model="newfavorite.newNomFav"/>
          </md-field>
          <md-dialog-actions>
            <md-button class="md-primary" @click="showDialog = false" v-on:click.prevent="holi">Close</md-button>
            <md-button class="md-primary" @click="showDialog = false">Save</md-button>
          </md-dialog-actions>
        </md-dialog>
      </div>-->
      <div>
        <md-dialog-prompt
        :md-active.sync="showDialogMod"
        v-model="modfavorite.newNomFav"
        md-title="Modificar favorito"
        md-input-maxlength="30"
        md-input-placeholder="Ingrese el nombre"
        md-confirm-text="Done"
        @md-confirm="modificarFavorito"/>
      </div>
      <div>
        <md-dialog-prompt
        :md-active.sync="showDialogNew"
        v-model="newfavorite.nombre"
        md-title="Agregar favorito"
        md-input-maxlength="30"
        md-input-placeholder="Ingrese el nombre"
        md-confirm-text="Done"
        @md-confirm="crearFavorito"/>
      </div>
      </div>
        <l-marker v-if="markerLatLng" :lat-lng="markerLatLng" >
            <l-popup>
              <md-button class="md-icon-button" @click="showDialogNew=true">
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
      modfavorite:{
        newNomFav:null,
        numFav:null
      },
      newfavorite:{
        nombre:null,
      },
      zoom:13,
      center:[3.42158, -76.5205],
      markerLatLng: null,
      urlocation: null,
      showDialogMod: false,
      showDialogNew:false,
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
    modificarFavorito(){
      this.$store.dispatch('modificarFavorito',this.modfavorite)
      .then(response => {
        this.$store.dispatch('favoritos')
        this.modfavorite.newNomFav=null
        this.modfavorite.numFav=null
      })
    },
    crearFavorito(){
      this.$store.dispatch('crearFavorito',{
        nombre:this.newfavorite.nombre,
        lat:this.markerLatLng[0],
        lon:this.markerLatLng[1]})
      .then(response => {
        this.$store.dispatch('favoritos')
        this.newfavorite.nombre=null
      })
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
.md-dialog {
    max-width: 768px;
  }
</style>
