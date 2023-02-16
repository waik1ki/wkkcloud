<template>
  <div class="d-flex align-center justify-space-between" style="height: 60px; border-bottom: 1px solid rgba(0,0,0,.12)">
    <v-card elevation="0" color="rgba(0,0,0,.0)" width="150">
      <v-img src="@/assets/logo_shadow.png"></v-img>
    </v-card>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on, attrs }">
        <div v-bind="attrs" v-on="on" class="d-flex align-center">
          <v-card width="35" height="35" rounded="xl" class="mr-3">
            <v-img
              src="https://www.pngitem.com/pimgs/m/22-220721_circled-user-male-type-user-colorful-icon-png.png"
            ></v-img>
          </v-card>
          <div>
            <h5>{{user.id}}</h5>
            <h6>{{user.email}}</h6>
          </div>
        </div>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img
                src="https://www.pngitem.com/pimgs/m/22-220721_circled-user-male-type-user-colorful-icon-png.png"
              >
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{user.id}}</v-list-item-title>
              <v-list-item-subtitle>{{user.email}}</v-list-item-subtitle>
            </v-list-item-content>       
            <v-list-item-action>
              <div class="uploadBtn" @click="logout">
                <label>로그아웃</label>
              </div>
            </v-list-item-action> 
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  data(){
    return{
      menu: false,
      containerName: '',
    }
  },
  computed: {
    ...mapState({
        containerPath: state => state.container.path,
        user: state => state.auth.user,
    })
  },
  methods: {
    logout(){
      this.$store.dispatch('auth/logout')
    },
    createContainer(){
      this.$store.dispatch('container/createContainer', {
        containerName: this.containerName
      })
    },
    // deleteContainer(){
    //   this.$store.dispatch('container/deleteContainer', {
    //     container: this.containerId
    //   })
    // },
  }
}
</script>

<style>

</style>