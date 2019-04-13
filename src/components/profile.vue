<template>
  <md-content>
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Profile</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('Name')">
                <label for="first-name">Nombre</label>
                <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="profile.nombre" :disabled="sending" />
                <!-- <span class="md-error" v-if="!$v.form.Name.required">The first name is required</span>
                <span class="md-error" v-else-if="!$v.form.Name.minlength">Invalid first name</span> -->
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('numero_celular')">
                <label for="last-name">Numero Celular</label>
                <md-input name="numero_celular" id="numero_celular" autocomplete="family-name" v-model="profile.numero_celular" :disabled="true" />
                <!-- <span class="md-error" v-if="!$v.form.numero_celular.required">The Cellphone Number is required</span>
                <span class="md-error" v-else-if="!$v.form.numero_celular.minlength">Invalid Number</span>
                <span class="md-error" v-else-if="!$v.form.numero_celular.numeric">must be a number</span> -->
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">

              <md-field :class="getValidationClass('lastName')">
                <label for="last-name">Numero de Tarjeta</label>

                <md-input name="numero_targeta" id="targeta" autocomplete="family-name" v-model="profile.num_tarjetacredito" :disabled="sending" />
                <!-- <span class="md-error" v-if="!$v.form.numero_targeta.required">The Credit car Number is required</span>
                <span class="md-error" v-else-if="!$v.form.numero_targeta.minlength">Invalid Number</span> -->
              </md-field>
            </div>


            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('direccion')">
                <label for="direccion">Direccion</label>
                <md-input id="direccion" name="direccion" autocomplete="direction" v-model="profile.direccion" :disabled="sending" />
                <!-- <span class="md-error" v-if="!$v.form.direccion.required">The Direction is required</span>
                <span class="md-error" v-else-if="!$v.form.direccion.maxlength">Invalid Direction</span> -->
              </md-field>
            </div>
          </div>
          <!--
          <md-field :class="getValidationClass('password')">
            <label for="password">password</label>
            <md-input type="password" name="password" id="password" autocomplete="password" v-model="form.password" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.password.required">The password is required</span>
          </md-field>-->
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Modify user</md-button>
          <md-button @click="fillField" class="md-primary" :disabled="sending">testing</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="userSaved">{{msg}}</md-snackbar>
    </form>
  </md-content>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import {
    required,
    email,
    numeric,
    minLength,
    maxLength
  } from 'vuelidate/lib/validators'

  export default {
    name: 'profile',
    mixins: [validationMixin],
      data: () => ({
      form: {
        Name: null,//this.profile.nombre,
        numero_celular: null,//this.profile.numero_celular,
        num_tarjetacredito: null,//this.profile.numero_targetacredito,
        direccion: null,//this.profile.direccion,
      },
      userSaved: false,
      sending: false,
      editable: false,
      lastUser: null,
      msg: null
    }),
    computed:{
      profile(){
        return this.$store.getters.getProfile
      }
    },
    beforeCreate(){
      this.$store.dispatch('profile')
    },
    /*validations: {
      form: {
        Name: {
          required,
          minLength: minLength(3)
        },
        numero_celular: {
          required,
          minLength: minLength(3),
          numeric
        },
        direccion: {
          required,
          maxLength: maxLength(10)
        },
        gender: {
          required
        },
        password: {
          required
        },
        numero_targeta: {
          required,
          numeric,
          maxLength: maxLength(16),
          minLength: minLength(16)
        }
      }
    },*/
    methods: {
      getValidationClass (fieldName) {
        const field = null//this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      fillField() {
        //this.Name=this.profile.nombre;
        console.log(this.profile.nombre);
      },
      clearForm () {
        //this.$v.$reset()
        this.form.firstName = null
        this.form.lastName = null
        this.form.age = null
        this.form.gender = null
        this.form.email = null
      },
      saveUser () {
      //  this.sending = true //may be needed later
        this.$http.put('http://localhost:3000/user/',
        {numero_celular: this.profile.numero_celular,
           nombre: this.profile.nombre,
            direccion: this.profile.direccion,
             num_tarjetacredito: this.profile.num_tarjetacredito,})
          .then(request => this.$router.push({name:'profile'}))
          .catch(error => {this.msg=error.body.msg
          this.userSaved=true})

        // Instead of this timeout, here you can call your API

      /*  window.setTimeout(() => {
          this.lastUser = `${this.form.firstName} ${this.form.lastName}`
          this.userSaved = true
          this.sending = false
          this.clearForm()
        }, 1500)*/
      },
      validateUser () {
        //this.$v.$touch()
        this.saveUser()
        if (false){//this.$v.$invalid) {

        }
      },signup(req){
        if(req.status==200){
          this.$router.replace('/');
        }else{
          this.msg=req.body.msg;
          //console.log(this.msg);

        }
      }

    }
  }
</script>

<style lang="scss" scoped>
.md-content {
  position: relative;
  align-items: center;
  justify-content: center;
  top: 8vh;
  left: 24%;

}
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
</style>
