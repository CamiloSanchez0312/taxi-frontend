<template>
  <div>
      <md-button class="md-icon-button" @click="showNav = true">
            <md-icon>menu</md-icon>
      </md-button>
  <md-drawer :md-active.sync="showNav">
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">My App name</span>
      </md-toolbar>
      </md-drawer>
      <md-content></md-content>
    </div>

</template>

<script>
export default {
  name: 'toolbar',
  data() {
    return {
      title:"TUJEFAI",
      showNav : false
    }
  }
}
</script>

<style lang="css" scoped>
</style>
