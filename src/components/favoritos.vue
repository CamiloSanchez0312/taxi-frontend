<template>
  <div>
    <md-table v-model="favoritos" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar>
        <h1 class="md-title">Sitios Favoritos</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID"  md-numeric>{{ item.num_favorito }}</md-table-cell>
        <md-table-cell md-label="nombre" >{{ item.nombre }}</md-table-cell>
        <md-table-cell md-label="Modificar">
          <md-button  @click="showDialogMod=true" v-on:click="modfavorite.numFav=item.num_favorito"class="md-icon-button" >
            <md-icon>
              update
            </md-icon>
          </md-button>
        </md-table-cell>
        <md-table-cell md-label="Eliminar">
          <md-button  @click="borrarFavorito(item.num_favorito)" class="md-icon-button" >
            <md-icon>
              delete
            </md-icon>
          </md-button>
        </md-table-cell>
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
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  data(){
    return{
      modfavorite:{
        newNomFav:null,
        numFav:null
      },
      showDialogMod:false
    }
  },
  methods:{
    modificarFavorito(){
      this.$store.dispatch('modificarFavorito',this.modfavorite)
      .then(response => {
        this.$store.dispatch('favoritos')
        this.modfavorite.newNomFav=null
        this.modfavorite.numFav=null
      })
    },
    borrarFavorito(id){
      this.$store.dispatch('borrarFavorito',id)
      .then(response => {
        this.$store.dispatch('favoritos')
      })
    }
  },
  computed:{
    favoritos(){
      return this.$store.getters.getFavoritos
    }
  },
  beforeCreate(){
    this.$store.dispatch('favoritos')
  }
}
</script>

<style lang="css" scoped>
</style>
