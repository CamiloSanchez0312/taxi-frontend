<template lang="html">

  <md-empty-state md-rounded :md-theme="'default-dark'" class="md-primary" md-icon="local_taxi" md-label="Welcome" md-description="Time to make money!">
    <md-button v-if="disponible">Empezar</md-button>
   </md-empty-state>


</template>

<script>
export default {
  name: "dashboard",
  data(){
    return {
      disponible:true
    }
  },
  computed:{
    conductor(){
      return this.$store.getters.getconductor
    }
  },
  beforeCreate(){
    this.$store.dispatch('conductor')
  }

  }


</script>

<style lang="css" scoped>
</style>
