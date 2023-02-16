<template>
  <v-row no-gutters>
    <v-col cols="12">
      <div class="d-flex">
        <v-card class="mr-2">
          <v-btn elevation="0" height="55">Create Folder</v-btn>
        </v-card>
        <v-card>
          <v-btn elevation="0" height="55">Reload</v-btn>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data(){
    return{
      uploadDialog: false,
    }
  },
}
</script>

<style>

</style>