import Vue from 'vue'
import Vuex from 'vuex'
import User from '@/models/User.js'
import axios from 'axios'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state:{
    user: User.from(localStorage.token),
    taxisDisponibles:[]
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
    }
  },
  actions:{//desde aqui llamamos a las mutaciones, las acciones pueden ser asincronas
    login(context){
      context.commit('login')
    },
    logout(context){
      context.commit('logout')
    },
    taxis(context){
      axios.get('http://localhost:3000/taxis')
      .then(response => {
        const arr =[]
        const data = response.data
        console.log(data);
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
    }
  },
  getters:{
    currentUser(state){
      return state.user
    },
    getTaxis(state){
      return state.taxisDisponibles
    }
  }
})
