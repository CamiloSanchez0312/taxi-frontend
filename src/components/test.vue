<template lang="html">
  <div >

    <input type="text" v-model="numberUser.id"name="number" value="">
    <button type="button" name="button" v-on:click= "recibe" > obtain datalist </button>
<li>{{dataReceibed}}</li>

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
  methods: {
    recibe(){
      this.$http.get('http://172.19.26.32:3000/user' )
      .then(res => this.dataReceibed.push(res.body[res.body.length-2].nombre));
    }
  }
}
</script>

<style lang="css" scoped>
</style>
