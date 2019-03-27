<template>
  <div class="centered-container">
    <md-content class="md-elevation-3">
      <div class="title">
        <img class="img" src="../assets/taxi.jpg">
        <div class="md-title">Crazy Taxi Company</div>
        <div class="md-body-1">Ready for start your trip?</div>
      </div>

      <div class="form" @submit.prevent="auth"> <!--agrego @submit.prevent porque si lo omitimos Vue ejecutara el método, pero luego permitiría que el evento se disparara en el navegador, desordenando nuestro flujo.-->
        <md-field>
          <label>E-mail</label>
          <md-input v-model="login.email" autofocus></md-input>
        </md-field>

        <md-field md-has-password>
          <label>Password</label>
          <md-input v-model="login.password" type="password"></md-input>
        </md-field>
      </div>

      <div class="actions md-layout md-alignment-center-space-between">
        <a href="/resetpassword">Reset password</a>
        <md-button class="md-raised md-primary" type="submit" @click="auth">Log in</md-button>
      </div>

      <div class="loading-overlay" v-if="loading">
        <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
      </div>
    </md-content>
    <div class="background"/>
  </div>
</template>

<script>


export default {
  name:'User',
  data() {
    return {
      loading: false,
      login: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    auth() {
      // your code to login user
      // this is only for example of loading
      console.log('HOLI');
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 5000);
    }
  }
}
</script>

<style lang="scss" >
.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 1;
  top: 7vh;
  .title {
    text-align: center;
    margin-bottom: 40px;
    img {
      margin-bottom: 16px;
      max-width: 80px;
    }
  }
  .actions {
    .md-button {
      margin: 0;
    }
  }
  .form {
    margin-bottom: 60px;
  }
  .background {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: -200;
  }
  .md-content {
    z-index: 0;
    padding: 40px;
    width: 100%;
    max-width: 400px;
    position: relative;
  }
  .loading-overlay {
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}



</style>
