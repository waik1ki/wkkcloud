<template>
  <v-card elevation="0">
    <v-row no-gutters class="py-3 px-4">
      <v-col cols="12">
        <div class="d-flex">
          <v-spacer></v-spacer>
          <div class="uploadBtn mr-2" @click="df">
            <label>다운로드</label>
          </div>
          <div class="uploadBtn mr-2">
            <label for="file_input">업로드</label>
            <v-file-input v-show="false" id="file_input" multiple @change="selectFile"></v-file-input>
          </div>   
          <div class="uploadBtn" @click="rf">
            <label>삭제</label>
          </div>
          <!-- <v-btn @click="df">다운로드</v-btn>
          <v-btn @click="rf">삭제</v-btn> -->
        </div>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row no-gutters class="py-3 px-4">
        <v-col cols="5" class="d-flex align-center">
          <h5 style="font-weight: 300" class="d-flex align-center"><input type="checkbox" id="checkbox_all" @click="checkAll(tf)" class="mr-4">이름</h5>
        </v-col>
        <v-col cols="1">
          <h5 style="font-weight: 300">크기</h5>
        </v-col>
        <v-col cols="3">
          <h5 style="font-weight: 300">업로드 날짜</h5>
        </v-col>
        <v-col cols="1">
          <h5 style="font-weight: 300">작성자</h5>
        </v-col>
        <v-col cols="2">
          <h5 style="font-weight: 300">타입</h5>
        </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row v-for="(i,idx) in files" :key="idx" class="rowhover px-4 py-3" no-gutters>
      <v-col cols="5">
        <h5 style="font-weight: 300" class="d-flex align-center"><input type="checkbox" id="checkbox" v-model="seletedFiles" :value="i" @click="check()" class="mr-4">{{i.name}}</h5>
      </v-col>
      <v-col cols="1">
        <h5 style="font-weight: 300">{{size(i.size)}}</h5>
      </v-col>
      <v-col cols="3">
        <h5 style="font-weight: 300">{{i.created_at}}</h5>
      </v-col>
      <v-col cols="1">
        <h5 style="font-weight: 300">{{i.author}}</h5>
      </v-col>
      <v-col cols="2">
        <h5 style="font-weight: 300">{{i.ftype}}</h5>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>

import {mapState} from 'vuex'
import axios from 'axios'
axios.defaults.headers['Pragma'] = 'no-cache';
import bus from '../utils/bus'

export default {
  data(){
    return{
      file: '',
      seletedFiles: [],
      data: [],
      uploadDialog: false,
    }
  },
  computed: {
    ...mapState({
        tf: state => state.checked,
        files: state => state.file.files,
        user: state => state.auth.user,
        containerId: state => state.container.id,
        containerPath: state => state.container.path,
    })
  },
  methods: {
    size(data) {
      if (data < Math.pow(1000, 2)) {
        return Math.ceil((data / 1024)* 10) / 10 + "KB"
      }
      return Math.ceil((data / 1024 / 1024)* 10) / 10 + "MB"
    },
    df() {
      for (var i = 0; i < this.seletedFiles.length; i++) {
        window.open(this.seletedFiles[i].downloadUrl);
      }
      var objs = document.querySelectorAll("#checkbox");
      for (i = 0; i < objs.length; i++) {
        objs[i].checked = false
      }
      this.seletedFiles = [];
      var acb = document.querySelector("#checkbox_all");
      acb.checked = false;
      this.$store.commit('setChecked', true);
    },
    rf() {
      var deletefile_list = []
      for (var i = 0; i < this.seletedFiles.length; i++) {
        deletefile_list.push(this.seletedFiles[i].name)
        console.log(this.seletedFiles[i].name)
      }
      this.deleteFile(deletefile_list)
    },
    deleteFile(file) {
      bus.$emit('start:spinner');
      this.$store.dispatch('file/deleteFile',{
        containerId: this.containerId,
        file: file
      }).then(() => {
        var objs = document.querySelectorAll("#checkbox");
        for (var i = 0; i < objs.length; i++) {
          objs[i].checked = false
        }
        var acb = document.querySelector("#checkbox_all");
        acb.checked = false;
        this.$store.commit('setChecked', true);
        this.$store.dispatch('overview/getOverview');
      })
    },
    selectFile(file) {
      this.file = file
      console.log(this.file)
      console.log(this.file.length)
      this.uploadFile();
    },
    uploadFile() {
      const formData = new FormData();
      for (var i = 0; i < this.file.length; i++) {
        formData.append('file'+i, this.file[i]);
      }
      formData.append('fileCnt', this.file.length);
      formData.append('container', this.containerId);
      formData.append('author', this.user.name);
      bus.$emit('start:spinner');
      this.$store.dispatch('file/uploadFile',{
        data: formData,
        containerId: this.containerId
      }).then(() => {
        this.$store.dispatch('overview/getOverview')
        this.file = ''
      })
    },
    checkAll(bool){
      var objs = document.querySelectorAll("#checkbox");
      var s_files = []
      if (bool === true) {
        for (var i = 0; i < objs.length; i++) {
          objs[i].checked = bool
          s_files.push(objs[i]._value)
        }
        this.seletedFiles = s_files
      } else if (bool === false) {
        for (i = 0; i < objs.length; i++) {
          objs[i].checked = bool
          this.s_files = []
        }
      }
      this.$store.commit('setChecked', !this.tf)
    },
    check(){
      var acb = document.querySelector("#checkbox_all");
      acb.checked = false
      this.$store.commit('setChecked', true)
    }
  },
  watch: {
    containerPath() {
      this.$store.commit('setChecked', false)
      var acb = document.querySelector("#checkbox_all");
      acb.checked = false
      this.checkAll(this.tf)
    }
  }
}
</script>

<style>
.rowhover {
  border-bottom: 1px solid rgba(0,0,0,.12);
}
.rowhover:hover {
  background-color: #F1F7FF;
  font-weight: 500;
}
.v-input--selection-controls {
  margin: 0 !important;
  padding: 0 !important;
}
.rowhover > .v-icon.v-icon {
  font-size: 17px !important;
}
.uploadBtn label {
  display: inline-block;
  padding: .693em 1.15em;
  color: white;
  font-size: 13px;
  line-height: normal;
  vertical-align: middle;
  background-color: #5a5b66;
  cursor: pointer;
  border-radius: .5em;
}
#searchbox .v-input {
  height: 27px !important;
}
#searchbox .v-input__slot {
  min-height: 27px !important;
  box-shadow: none !important;
}
#searchbox .v-input input {
  max-height: 27px !important;
}
#searchbox .v-label, .v-input {
  font-size: 13px !important;
}

</style>