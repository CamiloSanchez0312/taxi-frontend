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
      <div>
        <l-marker :lat-lng="origin" :icon="iconOrigin"></l-marker>
        <l-marker :lat-lng="destiny" :icon="iconDestiny"></l-marker>
        <l-marker v-if="urlocation" :lat-lng="urlocation" :icon="iconCurrentLocation">
          <l-popup>
            <md-button class="md-icon-button" @click="createOrigin(urlocation)">
              <md-icon>
                flight_takeoff
              </md-icon>
            </md-button>
            <md-button class="md-icon-button" @click="createDestiny(urlocation)">
              <md-icon>
                flight_land
              </md-icon>
            </md-button>
          </l-popup>
        </l-marker>
        <l-polyline :lat-lngs="polyline.latlng" :color="polyline.color"></l-polyline>
      </div>
      <div> <!--puse los for en dos div distintos porque generaba un error de llaves duplicadas-->
        <l-marker v-for="(favorito,j) in favoritos" :key="j" :lat-lng="favorito.coordenadas" :icon="iconFavorito">
          <l-tooltip>
            <u>Numero:</u> <b>{{favorito.num_favorito}}</b>
            <u>Nombre:</u> <b>{{favorito.nombre}}</b>
          </l-tooltip>
          <l-popup>
              <md-button @click="showDialogMod=true" v-on:click="modfavorite.numFav=favorito.num_favorito" class="md-icon-button" >
                <md-icon>
                  update
                </md-icon>
              </md-button>
              <md-button v-on:click="borrarFavorito(favorito.num_favorito)" class="md-icon-button" >
                <md-icon>
                  delete
                </md-icon>
              </md-button>
              <md-button class="md-icon-button" @click="createOrigin(favorito.coordenadas)">
                <md-icon>
                  flight_takeoff
                </md-icon>
              </md-button>
              <md-button class="md-icon-button" @click="createDestiny(favorito.coordenadas)">
                <md-icon>
                  flight_land
                </md-icon>
              </md-button>
          </l-popup>
        </l-marker>
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
        <l-marker v-if="markerLatLng" :lat-lng="markerLatLng" :icon="iconLocation">
            <l-popup>
              <md-button class="md-icon-button" @click="showDialogNew=true">
                <md-icon>
                  favorite_border
                </md-icon>
              </md-button>
              <md-button class="md-icon-button" @click="createOrigin(markerLatLng)">
                <md-icon>
                  flight_takeoff
                </md-icon>
              </md-button>
              <md-button class="md-icon-button" @click="createDestiny(markerLatLng)">
                <md-icon>
                  flight_land
                </md-icon>
              </md-button>
            </l-popup>
        </l-marker>
      </l-map>
      <md-button class="md-fab" id="md-fab" @click="currentLocation">
        <md-icon>my_location</md-icon>
      </md-button>
      <md-button class="md-fab" id="taxi" v-on:click="taxistaCercano" @click="showDialogConductor=true">
        <md-icon>local_taxi</md-icon>
      </md-button>
      <div>
        <md-dialog :md-active.sync="showDialogConductor">
          <md-dialog-title>Info Del conductor</md-dialog-title>
          <md-content>
          <md-field>
            <label>Nombre:</label>
            <md-input v-model="conductorElegido.nombre" readonly></md-input>
          </md-field>
          <md-field>
            <label>Numero Celular:</label>
            <md-input v-model="conductorElegido.numero_celular" readonly></md-input>
          </md-field>
          <md-field>
            <label>Matricula:</label>
            <md-input v-model="conductorElegido.matricula" readonly></md-input>
          </md-field>
          <md-field>
            <label>Marca:</label>
            <md-input v-model="conductorElegido.marca" readonly></md-input>
          </md-field>
          <md-field>
            <label>Modelo:</label>
            <md-input v-model="conductorElegido.modelo" readonly></md-input>
          </md-field>
        </md-content>
          <md-dialog-actions>
            <md-button class="md-primary"  @click="showDialogConductor = false">Cancelar</md-button>
            <md-button class="md-primary" v-on:click="aceptarServicio" @click="showDialogConductor = false">Aceptar</md-button>
          </md-dialog-actions>
        </md-dialog>
      </div>
      </div>
</template>

<script>

import {LMap, LTileLayer, LMarker,LPopup,LTooltip,LPolyline} from 'vue2-leaflet';
import {mapGetters} from 'vuex'
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip,
    LPolyline
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
      showDialogConductor:false,
      iconTaxi:L.icon({
        iconUrl:'static/taxi.png',
        iconSize: [50, 45],
        iconAnchor: [40, 37]
      }),
      iconFavorito:L.icon({
        iconUrl:'static/favorito.png',
        iconSize: [50, 45],
        iconAnchor: [40, 37]
      }),
      iconLocation:L.icon({
        iconUrl:'static/add_location.png',
        iconSize:[50,45],
        iconAnchor:[40,37]
      }),
      iconOrigin:L.icon({
        iconUrl:'static/origin.png',
        iconSize:[50,45],
        iconAnchor:[40,37]
      }),
      iconDestiny:L.icon({
        iconUrl:'static/destiny.png',
        iconSize:[50,45],
        iconAnchor:[40,37]
      }),
      iconCurrentLocation:L.icon({
        iconUrl:'static/currentLocation.png',
        iconSize:[50,45],
        iconAnchor:[40,37]
      })
    }
  },
  computed:{
    taxis(){
      return this.$store.getters.getTaxis
    },
    favoritos(){
      return this.$store.getters.getFavoritos
    },
    origin(){
      return this.$store.getters.getTripOrigin
    },
    destiny(){
      return this.$store.getters.getTripDestiny
    },
    polyline(){
      return{
        latlng:[this.origin,this.destiny], //https://leafletjs.com/reference-1.4.0.html#polyline
        color:'red'
      }
    },
    conductorElegido(){
      return this.$store.getters.getInfoTaxista
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
    },
    borrarFavorito(id){
      this.$store.dispatch('borrarFavorito',id)
      .then(response => {
        this.$store.dispatch('favoritos')
      })
    },
    createOrigin(coor){
      this.$store.dispatch('createOrigin',coor)
    },
    createDestiny(coor){
      this.$store.dispatch('createDestiny',coor)
    },
    currentLocation(){
      this.$nextTick(() => {
        this.$refs.myMap.mapObject.locate({enableHighAccuracy: true});
        this.$refs.myMap.mapObject.on('locationfound', e =>{
          //console.log(e);
          this.urlocation= [e.latitude, e.longitude]
          this.$refs.myMap.mapObject.setView(this.urlocation, 15)
        });
      })
    },
    taxistaCercano(){
      this.$store.dispatch('taxistaCercano')
    },
    aceptarServicio(){
      this.$store.dispatch('aceptarServicio')
      console.log('Servicio Aceptado');
    }
  },
  /*mounted () {
      this.$nextTick(() => {
        this.$refs.myMap.mapObject.locate({enableHighAccuracy: true});
        this.$refs.myMap.mapObject.on('locationfound', e =>{
          console.log(e);
          this.urlocation= [e.latitude, e.longitude]

  });
      })
    }*/
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
#md-fab {
  z-index: 1;
  position: fixed;
  left: 92%;
  bottom: 5%;
}

#taxi {
  z-index: 1;
  position: fixed;
  right: 92%;
  bottom: 5%;
}

.md-dialog {
    max-width: 768px;
}
</style>
