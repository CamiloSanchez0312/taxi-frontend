<template lang="html">
<md-content>
  <md-empty-state md-rounded :md-theme="'default-dark'" class="md-primary" md-icon="local_taxi" md-label="Welcome" md-description="Time to make money!">
    <md-button v-if="disponible" @click="changeConductor">Empezar</md-button>
   </md-empty-state>
   <span>{{this.$store.state.conductor}}</span>
</md-content>

</template>

<script>
import {mapGetters, mapState} from 'vuex'

export default {
  name: "dashboard",
  data(){
    return {
      disponible:true,
      coor: null,
      start: false,
    }
  },
  computed:{
...mapState(['state']),
conductor: {
  set(val){
    this.$store.commit('conductor', val)
  },
  get(){
    return this.$store.state.conductor
  }
}
},
methods:{
  changeConductor(){
    this.conductor=!this.conductor
  }
}

  }


</script>

<style lang="css" scoped>
</style>
