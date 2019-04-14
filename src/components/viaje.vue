<template>
  <md-content>
    <form novalidate class="md-layout">
  <md-card class="md-layout-item md-size-50 md-small-size-100">
  <md-card-content>
      <md-card-header>
        <div class="md-title">Viaje</div>
      </md-card-header>
      <div class="md-layout md-gutter">


      <div class="md-layout-item md-small-size-100">
      <md-field >
        <label>Nombre Conductor:</label>
        <md-input v-model="infoTaxista.nombre" disabled></md-input>
      </md-field>
    </div>
    <div class="md-layout-item md-small-size-100">
      <md-field>
        <label>Celular Conductor:</label>
        <md-input v-model="infoTaxista.numero_celular" disabled></md-input>
      </md-field>
      </div>
        </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
      <md-field>
        <label>Matricula:</label>
        <md-input v-model="infoTaxista.matricula" disabled></md-input>
      </md-field>
      </div>
      <div class="md-layout-item md-small-size-100">
      <md-field>
        <label>Marca:</label>
        <md-input v-model="infoTaxista.marca" disabled></md-input>
      </md-field>
      </div>
    </div>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
      <md-field>
        <label>Modelo:</label>
        <md-input v-model="infoTaxista.modelo" disabled></md-input>
      </md-field>
      </div>
      <div class="md-layout-item md-small-size-100">
      <md-field>
        <label>Distancia Viaje:</label>
        <md-input v-model="distanciaViaje" disabled></md-input>
      </md-field>
      </div>
      </div>
      <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
      <md-field>
        <label>Precio Viaje:</label>
        <md-input v-model="precioViaje" disabled></md-input>
      </md-field>
      </div>
        <div class="md-layout-item md-small-size-100">
        <md-field>
          <md-select v-model="calificacion_servicio" placeholder="Calificacion">
            <md-option value="1">1 Estrella</md-option>
            <md-option value="2">2 Estrellas</md-option>
            <md-option value="3">3 Estrellas</md-option>
            <md-option value="4">4 Estrellas</md-option>
            <md-option value="5">5 Estrellas</md-option>
          </md-select>
        </md-field>
        <h1>{{calificacion_servicio}}</h1>
        </div>
        </div>

  </md-card-content>
  <md-card-actions>
    <router-link :to="{ name: 'map', params: {} }">
      <md-button v-on:click="finalizarViaje" class="md-primary"> Finalizar Viaje</md-button>
    </router-link>
  </md-card-actions>
</md-card>
</form>
</md-content>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name:'viaje',
  data(){
    return{
      calificacion_servicio:null
    }
  },
  computed:{
    infoTaxista(){
      return this.$store.getters.getInfoTaxista
    },
    precioViaje(){
      return this.$store.getters.getPrecioViaje
    },
    distanciaViaje(){
      return this.$store.getters.getDistanciaViaje
    },
    // nro_servicio(){
    //   return this.$store.getters.getNroServicio
    // }
  },
  methods:{
    finalizarViaje(){
      console.log(this.calificacion_servicio);
      this.$store.dispatch('finalizarViaje',this.calificacion_servicio)
    }
  }
}
</script>

<style  lang="scss" scoped>
.md-content {
  position: relative;
  align-items: center;
  justify-content: center;
  top: 8vh;
  left: 24%;
}
.md-field {
    max-width: 300px;
  }
</style>
