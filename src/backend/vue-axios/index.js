import Vue from 'vue'
import VueAxios from 'vue-axios'
import Axios from 'axios'
//const API_URL = process.env.API_URL || 'http://localhost:3000'
export default axios.create({
  headers: {
    //baseURL: API_URL,
    'Content-Type': 'application/json',//solo queremos respuestas en json
    'Authorization': 'Bearer ' + localStorage.token //adjuntamos un token a cada llamado
  }
})
Vue.use(VueAxios, Axios)//gracias a esto  $http esta disponible en todos los componentes
