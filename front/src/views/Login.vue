<template>
  <div class="d-flex justify-center align-center" style="height: 100%; background-color: #EAF2FE">
    <v-card class="py-4 px-10 d-flex flex-column justify-center" elevation="15" width="400" height="270" style="border-top: 13px solid #EAF2FE" rounded="lg">
      <div class="mb-4 text-center">
        <h2>WKK CLOUD</h2>
      </div>
      <div>
        <v-card class="d-flex align-center py-1 px-5 mb-4" elevation="0" rounded="0" color="rgb(230,230,230)">
          <v-icon>mdi-account</v-icon>
          <!-- <div class="ml-2" style="height: 25px; width: 2px; background-color: grey"></div> -->
          <v-text-field
            solo
            v-model="id"
            hide-details=""
            label="Username"
          ></v-text-field>
        </v-card>
        <v-card class="d-flex align-center py-1 px-5 mb-4" elevation="0" rounded="0" color="rgb(230,230,230)">
          <v-icon>mdi-lock</v-icon>
          <!-- <div class="ml-2" style="height: 25px; width: 2px; background-color: grey"></div> -->
          <v-text-field
            solo
            type="password"
            v-model="password"
            hide-details=""
            label="Password"
          ></v-text-field>
        </v-card>
      </div>
      <div class="d-flex justify-center">
        <v-btn @click="login()" width="80" rounded elevation="0" color="#229792"><h5 style="color: white;">LOGIN</h5></v-btn>
      </div>
    </v-card>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      transition="slide-y-transition"
      content-class="text-center"
      color="white"
      max-width="300"
      min-width="300"
      top
      elevation="7"
      rounded="b-xl"
    >
      <h4 style="color: black">{{validationErrors}}</h4>
    </v-snackbar>
  </div>
</template>

<script>
  // import * as authApi from '@/api/auth';
  import {mapState} from 'vuex'
  import axios from 'axios'
  axios.defaults.headers['Pragma'] = 'no-cache';

  export default {
    data(){
      return{
        id:'',
        password:'',
        snackbar: false,
        timeout: 1500,
      }
    },
    computed: {
      ...mapState({
        validationErrors: state => state.error.validations,
      })
    },
    methods: {
      login(){
        this.$store.dispatch('auth/login',{
          id:this.id,
          password:this.password
        })
      },
    },
    watch: {
      validationErrors () {
        if (this.validationErrors === null) {
          return
        } else {
          this.snackbar = true;
        }
      }
    }
  }
</script>

<style>
.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat) > .v-input__control > .v-input__slot {
  box-shadow: none !important;  
}
.theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
  background-color: rgb(230,230,230) !important;
}
.v-text-field.v-text-field--solo .v-input__control {
  min-height: 35px !important;
}
input[type="password"] {
  font-family: Verdana;
}

</style>