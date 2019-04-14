<template>
  <div class="centered-container">
    <md-content novalidate class="md-elevation-3">
      <div class="title">
        <img class="img" src="../assets/taxi.jpg">
        <div class="md-title">NOT THAT EASY TAXI</div>
        <div class="md-body-1">Ready for start your trip?</div>
      </div>

      <form class="md-layout-item" @submit.prevent="login"> <!--agrego @submit.prevent porque si lo omitimos Vue ejecutara el método, pero luego permitiría que el evento se disparara en el navegador, desordenando nuestro flujo.-->
        <!-- <div class="alert alert-danger" v-if="userLogin.error">{{ userLogin.error }}</div> -->
        <md-switch class="md-primary" v-on:change ="type_user_func" v-model="isConductor" > {{type_user}} </md-switch>
        <md-field :class="getValidationClass('user')">
          <label for="">Numero</label>
          <md-input v-model="userLogin.user" autofocus></md-input>
          <span class="md-error" v-if="!$v.userLogin.user.required">Emm.. prueba escribiendo el usuario.</span>
          <span class="md-error" v-else-if="!$v.userLogin.user.numeric"> prueba usando un numero.</span>
        </md-field>

        <md-field md-has-password :class="getValidationClass('password')">
          <label>Password</label>
          <md-input v-model="userLogin.password" type="password"></md-input>
          <span class="md-error" v-if="!$v.userLogin.password.required">Quizas debas escribir la contraseña.</span>
        </md-field>
      </form>

      <div class="actions md-layout md-alignment-center-space-between">

        <!-- <a href="/register">Registrarse</a> -->
        <router-link :to="{ name: 'register', params: {} }">Registrarse</router-link>
        <md-button class="md-raised md-primary" type="submit" @click="login">Log in</md-button>

      </div>

      <div class="loading-overlay" v-if="loading">
        <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
      </div>
      <md-snackbar :md-duration="4000" :md-active.sync="msgBoolean" md-persistent>{{userLogin.msg}}</md-snackbar>
    </md-content>
    <div class="background"/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import { validationMixin } from 'vuelidate'
import {
  required,
  email,
  numeric,
  minLength,
  maxLength
} from 'vuelidate/lib/validators'



export default {
  name:'Login',
  mixins: [validationMixin],
  data: () => {
    return {
      loading: false,
      msgBoolean: false,
      isConductor:false,
      type_user: "Usuario",
      userLogin: {
        user: "",
        password: "",
        error: false,
        msg:null
      }
    };
  },
  validations:{
    userLogin: {
      user:{
        required,
        numeric
      },
      password:{
        required
      }

    }
  },
  computed:{
  ...mapGetters({currentUser: 'currentUser'}),
  conductor(){
    return this.$store.getters.getconductor
  }
  },
  created(){
    this.checkCurrentLogin()
  },
  updated(){
    this.checkCurrentLogin()
  },
  methods: {
    /*auth() {
      // your code to login user
      // this is only for example of loading
      console.log('HOLI');
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 5000);
    }*/

    type_user_func(){
      if(this.isConductor){
        this.type_user="Condutor"
       this.conductor=true
      }else{
        this.type_user="Usuario"
        this.conductor=false
      }
    },

    checkCurrentLogin(){//cuando ya haya un usuario logueado, no permite ingresar a la ventana del login
      if(this.currentUser){
        this.$router.push({name:'profile'})
      }
    },

    getValidationClass (fieldName) {
      const field = this.$v.userLogin[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }


      }
    },
    login () {
      this.$v.userLogin.$touch();
 var UrlLogin;
      if(this.conductor){
        UrlLogin='http://localhost:3000/driver/login'
      }else{
        UrlLogin='http://localhost:3000/user/login'
      }
    //  console.log('HOLI');
      if (!this.$v.$invalid) {
      this.loading=true;
      this.$http.post(UrlLogin, {numero_celular: this.userLogin.user, password: this.userLogin.password })
        .then(request => {this.loginSuccessful(request)
          this.userLogin.msg=request.data.msg
          this.msgBoolean=true;
          this.loading=false;})
        .catch((err) => { this.loginFailed()
          this.userLogin.msg=err.data.msg
          this.msgBoolean=true;
          this.loading=false;})
      }
    },
    loginSuccessful (req) {
      console.log(req.data.msg);
      if (!req.data.token) {
        this.userLogin.msg=req.data.msg
        this.loginFailed()
        return
      }
      this.userLogin.error = false
      localStorage.token = req.data.token
      this.$store.dispatch('login')

      if(this.conductor){
        this.$router.push({name:'dashboard'})
      }else{
        this.$router.push({name:'map'})
      }

    },
    loginFailed () {
    //  this.userLogin.error = 'Fallo en el login: '+this.userLogin.msg

      this.$store.dispatch('logout')
      delete localStorage.token
    }
  }
}
</script>

<style lang="scss">
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
