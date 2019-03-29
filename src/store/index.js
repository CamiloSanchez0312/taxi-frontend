import Vue from 'vue'
import Vuex from 'vuex'
import User from '@/models/User.js'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state:{
    user: User.from(localStorage.token)
  },
  mutations:{//para modificar estados, mutaciones son sincronas
    login:(state)=>{
      state.user=User.from(localStorage.token)
    },
    logout:(state)=>{
      state.user=null
    }
  },
  actions:{//desde aqui llamamos a las mutaciones, las acciones pueden ser asincronas
    login({commit}){
      commit('login')
    },
    logout({commit}){
      commit('logout')
    }
  },
  getters:{
    currentUser(state){
      return state.user
    }
  }
})
