<template>
  <div>
    <v-card class="pa-5" elevation="0">
      <div class="mb-2 d-flex">
        <h6>{{Math.ceil((totalSize / 1024 / 1024)* 10) / 10}}MB / 400MB</h6>
        <v-spacer></v-spacer>
        <h6>여유 {{400 - Math.ceil((totalSize / 1024 / 1024)* 10) / 10}}MB</h6>
      </div>
      <div class="mb-1">
        <v-progress-linear :value="Math.ceil((totalSize / 1024 / 1024)* 10) / 10" height="8" rounded></v-progress-linear>
      </div>
    </v-card>
    <v-divider></v-divider>
    <v-card elevation="0" class="pa-1 d-flex">
      <v-spacer></v-spacer>
      <v-dialog
        v-model="dialog"
        persistent
        max-width="300px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-icon style="color: #5a5b66; font-size: 20px;"
            v-bind="attrs"
            v-on="on"
          >mdi-folder-plus</v-icon>
        </template>
        <v-card class="pa-3 d-flex flex-column align-center">
          <div class="mb-3">
            <span>컨테이너 생성</span>
          </div>
          <v-card id="searchbox" class="d-flex align-center px-2 mb-3" height="33px" width="270px" elevation="0" rounded="0" outlined>
            <v-text-field
              solo
              hide-details=""
              v-model="containerName"
              label="컨테이너 명"
            ></v-text-field>
          </v-card>
          <div class="d-flex">
            <div class="uploadBtn mr-2" @click="dialog = false">
              <label>닫기</label>
            </div>
            <div class="uploadBtn" @click="createContainer">
              <label>생성</label>
            </div>
          </div>
        </v-card>
      </v-dialog>
      <v-icon style="color: #5a5b66; font-size: 20px;" @click="deleteContainer">mdi-delete</v-icon>
    </v-card>
    <v-card rounded="0" elevation="0" height="547" width="100%">
      <v-virtual-scroll
        v-if="!isLoading"
        :items="containers"
        :item-height="48"
        :height="500"
      >
        <template v-slot:default="{ item }" >
          <v-list-item @click="setNowPath(item)">
            <span
              style="font-size: 14px;"
            >
              {{item.name}}
            </span>
            <v-spacer></v-spacer>
            <v-icon v-if="item.id == containerId" x-small color="#5a5b66">mdi-checkbox-blank-circle</v-icon>
          </v-list-item>
        </template>
      </v-virtual-scroll>
    </v-card>
  </div>
</template>

<script>
import bus from '../utils/bus'
import {mapState} from 'vuex'

export default {
  data(){
    return{
      isLoading: true,
      dialog: false,
      containerName: null,
    }
  },
  computed: {
    ...mapState({
        containers: state => state.container.containers,
        containerId: state => state.container.id,
        containerPath: state => state.container.path,
        overview: state => state.overview.overview,
        totalSize: state => state.overview.totalSize,
    })
  },
  methods: {
    getOverview(){
      this.$store.dispatch('overview/getOverview')
    },
    createContainer(){
      bus.$emit('start:spinner');
      this.$store.dispatch('container/createContainer', {
        containerName: this.containerName
      })
      this.dialog = false
    },
    deleteContainer(){
      bus.$emit('start:spinner');
      this.$store.dispatch('container/deleteContainer', {
        containerId: this.containerId
      })
    },
    setNowPath(data) {
       this.$store.dispatch('container/setContainerId', {
        id: data.id
      });
      bus.$emit('start:spinner');
      this.$store.dispatch('file/getFileByContainer', {
        containerId: data.id
      })
      this.$store.dispatch('container/setContainerPath', {
        path: data.name
      })
    },
    async getContainerList() {
      await this.$store.dispatch('container/getContainers')
      this.isLoading = false
    },
  },
  created() {
    this.getContainerList();
    this.getOverview();
  }
}
</script>

<style>
.border {
  border: 2px dashed orange;
}
</style>