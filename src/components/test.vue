<template lang="html">
  <div >

    <input type="text" v-model="numberUser.id"name="number" value="">
    <button type="button" name="button" v-on:click= "recibe" > obtain datalist </button>
<li>{{dataReceibed}}</li>
<li>{{conductor}}</li>

  </div>
</template>

<script>
export default {
  data() {
    return{
    dataReceibed: [],
    numberUser: {
      id: null
      }

    }
  },
  computed:{
    conductor(){
      return this.$store.getters.getcondutor
    }
  },
  beforeCreate(){
    this.$store.dispatch('conductor')
  },
  methods: {
    recibe(){
      this.$http.get('http://localhost:3000/user' )
      .then(res => this.dataReceibed.push(res.body[res.body.length-2].nombre));
    }
  }
}
</script>

<style lang="css" scoped>
</style>
