<template>
  <v-row no-gutters justify="space-between">
    <v-col cols="2" v-for="i in overview" :key="i.index">
      <v-card rounded="lg" elevation="2" class="pa-3" height="110">
        <div class="d-flex align-center mb-3">
          <v-card width="40" height="40" rounded="xl" class="mr-3">
            <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
          </v-card>
          <div>
            <h4>{{i.name}}</h4>
            <h5>{{i.count}} files</h5>
          </div>
        </div>
        <div class="mb-1">
          <v-progress-linear :value="Math.ceil((i.size / 1024 / 1024)* 10) / 10" height="8" rounded></v-progress-linear>
        </div>
        <div class="d-flex">
          <h6>{{Math.ceil((i.size / 1024 / 1024)* 10) / 10}}MB</h6>
          <v-spacer></v-spacer>
          <h6>100MB</h6>
        </div>
      </v-card>
    </v-col>
    <v-col cols="3">
      <v-card rounded="lg" elevation="2" class="pa-3" height="110">
        <div class="d-flex align-center">
          <div class="mr-auto">
            <h4>Storage details</h4>
            <h6>Total space</h6>
            <h6>400MB</h6>
            <h6>Used space</h6>
            <h6>{{Math.ceil((totalSize / 1024 / 1024)* 10) / 10}}MB</h6>
          </div>
          <div>
            <v-progress-circular
              :size="85"
              :width="14"
              :value="Math.ceil(((totalSize / 1024 / 1024)* 10) / 10)/ 4"
            >
            <h4>{{Math.ceil(((totalSize / 1024 / 1024)* 10) / 10)/ 4}}%</h4>
            </v-progress-circular>          
          </div>
        </div>
      </v-card>      
    </v-col>
  </v-row>
</template>

<script>
import {mapState} from 'vuex'

export default {
  data(){
    return{
      value: 15,
      // summary: ["Document", "Zip Files", "Images", "Video"]
    }
  },
  computed: {
    ...mapState({
        overview: state => state.overview.overview,
        totalSize: state => state.overview.totalSize,
    })
  },  
  created() {
    this.getOverview();
  },
  methods: {
    getOverview(){
      this.$store.dispatch('overview/getOverview')
    },
  },
}
</script>

<style>

</style>