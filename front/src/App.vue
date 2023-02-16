<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
    <spinner :loading="loadingStatus"></spinner>
  </v-app>
</template>

<script>
import Spinner from './components/Spinner.vue'
import bus from './utils/bus'

export default {
  components: {
    Spinner
  },
  data() {
    return {
      loadingStatus: false,
    };
  },
  methods: {
    startSpinner() {
      this.loadingStatus = true;
    },
    endSpinner() {
      this.loadingStatus = false;
    }
  },
  created() {
    bus.$on('start:spinner', this.startSpinner);
    bus.$on('end:spinner', this.endSpinner);
  },
  beforeDestroy() {
    bus.$off('start:spinner', this.startSpinner);
    bus.$off('end:spinner', this.endSpinner);
  }
};
</script>

<style>
* {
  /* font-family: 'Montserrat', sans-serif; */
  font-family: 'NanumBarunGothic';
}
</style>
