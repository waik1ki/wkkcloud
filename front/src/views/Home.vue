<template>
  <div v-if="isLoggedIn" style="height: 100%; background-color: #EAF2FE" class="d-flex justify-center align-center">
    <v-card width="1300" height="750" elevation="15" rounded="xl">
      <Header class="px-8"/>
      <div class="d-flex" style="height: calc(100% - 60px)">
        <div style="width: 16%; border-right:1px solid rgba(0,0,0,.12)">
          <Sidebar/>
        </div>
        <div style="width: 84%; height: 100%;">
            <Container/>
        </div>
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
      <span style="color: black">{{respText}}</span>
    </v-snackbar>
  </div>
  
</template>

<script>
import {mapState} from 'vuex'
import Sidebar from '../components/Sidebar.vue'
import Header from '../components/Header.vue';
import Container from '../components/Container.vue';
import axios from 'axios'
axios.defaults.headers['Pragma'] = 'no-cache';

export default {
  components: {
    Sidebar,
    Header,
    Container,
  },
  computed: {
    ...mapState({
        containerPath: state => state.container.path,
        isLoggedIn: state => state.auth.isLoggedIn,
        user: state => state.auth.user,
        respText: state => state.respText,
    })
  },  
  created() {
    // this.getRecentUploadFiles();
    this.auth();
  },
  data(){
    return{
      id:'',
      password:'',
      snackbar: false,
      timeout: 1500,
      uploadDialog: false,
    }
  },
  methods: {
    // getRecentUploadFiles(){
    //   this.$store.dispatch('file/getRecentUploadFiles')
    // },
    auth(){
      if (this.user === null) {
        this.$router.replace('/login')
      }
    }
  },
  watch: {
    respText() {
      if (this.respText === null) {
        return
      } else {
        this.snackbar = true;
      }
    },
    snackbar() {
      if (this.snackbar === false) {
        this.$store.commit('setRespText', null);
      } else {
        return
      }
    }
  }  
}
</script>

<style>
.v-application--is-ltr .v-snack__action {
  margin-right: 0 !important;
}
</style>