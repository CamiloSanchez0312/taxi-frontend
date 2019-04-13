import Vue from 'vue'
import Vuex from 'vuex'
import User from '@/models/User.js'
import axios from 'axios'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state:{
    user: User.from(localStorage.token),
    taxisDisponibles:[],
    sitiosFavoritos:[],
    profile:{numero_celular:null,nombre:null,direccion:null,num_tarjetacredito:null},
    tripOrigin:null,
    tripDestiny:null,
    infoTaxista:{numero_celular:null,nombre:null,distancia:null,distanciaViaje:null,matricula:null,marca:null,modelo:null}
  },
  mutations:{//para modificar estados, mutaciones son sincronas
    login:(state)=>{
      state.user=User.from(localStorage.token)
    },
    logout:(state)=>{
      state.user=User.from('')
    },
    taxis:(state,arr)=>{
      state.taxisDisponibles=arr
    },
    favoritos:(state,arr)=>{
      state.sitiosFavoritos=arr
    },
    borrarTaxisDisponibles:(state) => {
      state.taxisDisponibles=[]
    },
    borrarSitiosFavoritos:(state) => {
      state.sitiosFavoritos=[]
    },
    profile:(state,pro) =>{
      state.profile=pro
    },
    tripOrigin:(state,coor) => {
      state.tripOrigin=coor
    },
    tripDestiny:(state,coor) => {
      state.tripDestiny=coor
    },
    borrarTripOrigin:(state,coor) => {
      state.tripOrigin=null
    },
    borrarTripDestiny:(state,coor) => {
      state.tripDestiny=null
    },
    taxistaCercano:(state,tax) => {
      const {nom,num,dis,disviaje,matricula,marca,modelo}=tax
      state.infoTaxista={
        nombre:nom,
        numero_celular:num,
        distancia:dis,
        distanciaViaje:disviaje,
        matricula,
        marca,
        modelo
      }
    }
  },
  actions:{//desde aqui llamamos a las mutaciones, las acciones pueden ser asincronas
    login(context){
      context.commit('login')
    },
    logout(context){
      context.commit('logout')
      context.commit('borrarTaxisDisponibles')
      context.commit('borrarSitiosFavoritos')
      context.commit('borrarTripOrigin')
      context.commit('borrarTripDestiny')
    },
    taxis(context){
      axios.get('http://localhost:3000/taxis')
      .then(response => {
        const arr =[]
        const data = response.data
        //console.log(data);
        for(var i in data){
          var numero_celular = data[i].numero_celular
          var nombre = data[i].nombre
          var calificacion_conductor = data[i].calificacion_conductor
          var lat = data[i].coor.coordinates[0]
          var lon = data[i].coor.coordinates[1]
          arr.push({numero_celular,nombre,calificacion_conductor,coordenadas: [lat,lon]})
        }
        context.commit('taxis',arr)
      })
      .catch(err => {
        console.log(err);
      })
    },
    favoritos(context){
      axios.get('http://localhost:3000/favorito/'+User.from(localStorage.token).numero_celular)
      .then(response => {
        const arr=[]
        const data = response.data
        for(var i in data){
          var num_favorito = data[i].num_favorito
          var nombre = data[i].nombre
          var lat = data[i].coor.coordinates[0]
          var lon = data[i].coor.coordinates[1]
          arr.push({num_favorito,nombre,coordenadas: [lat,lon]})
        }
        context.commit('favoritos',arr)
      })
      .catch( err => console.log(err))
    },
    modificarFavorito(context,fav){
      return new Promise((resolve,reject)=>{
        axios.put('http://localhost:3000/favorito/',{
          numero_celular:User.from(localStorage.token).numero_celular,
          newNombre:fav.newNomFav,
          id:fav.numFav
        })
        .then(res => {
          resolve(res)
        })
        .catch(err =>{
          reject(err)
          console.log(err);
        })
      })
    },
    crearFavorito(context,fav){
      return new Promise((resolve,reject) => {
        axios.post('http://localhost:3000/favorito/',{
          numero_celular:User.from(localStorage.token).numero_celular,
          nombre:fav.nombre,
          lat:fav.lat,
          lon:fav.lon
        })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    borrarFavorito(context,id){
      return new Promise((resolve,reject) => {
        axios.delete('http://localhost:3000/favorito/'+User.from(localStorage.token).numero_celular+'/'+id)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    profile(context){
      return new Promise((resolve,reject) => {
        axios.get('http://localhost:3000/profile/'+User.from(localStorage.token).numero_celular)
        .then(res => {
          context.commit('profile',res.data)
          //console.log(context.getters.getProfile)
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    createOrigin(context,p){
      context.commit('tripOrigin', p)
    },
    createDestiny(context,p){
      context.commit('tripDestiny', p)
    },
    taxistaCercano(context){
      return new Promise((resolve,reject) => {
        axios.post('http://localhost:3000/servicio',{
          latOr:context.getters.getTripOrigin[0],
          lngOr:context.getters.getTripOrigin[1], //mando origen y destino para de una vez calcular la distancia y precio del viaje
          latDes:context.getters.getTripDestiny[0],
          lngDes:context.getters.getTripDestiny[1]
        })
        .then(res => {
          context.commit('taxistaCercano',res.data)
          //console.log(context.getters.getInfoTaxista.nombre);
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    aceptarServicio(context){
      return new Promise((resolve,reject) => {
        axios.post('http://localhost:3000/servicio/acepta',{
          numero_celular_cond:context.getters.getInfoTaxista.numero_celular,
          numero_celular_user:User.from(localStorage.token).numero_celular,
          coordenada_inicio:context.getters.getTripOrigin,
          coordenada_destino:context.getters.getTripDestiny
        })
      })
    }
  },
  getters:{
    currentUser(state){
      return state.user
    },
    getTaxis(state){
      return state.taxisDisponibles
    },
    getFavoritos(state){
      return state.sitiosFavoritos
    },
    getProfile(state){
      return state.profile
    },
    getTripOrigin(state){
      return state.tripOrigin
    },
    getTripDestiny(state){
      return state.tripDestiny
    },
    getInfoTaxista(state){
      return state.infoTaxista
    }
  }
})
