<template>
  <div class="pa-16">
    <v-btn @click="getUsers()">유저목록</v-btn>
    <ul>
        <li v-for="u in users" :key="u.index">{{u.Id}}</li>
    </ul>
  </div>
</template>

<script>
  import axios from 'axios'
  axios.defaults.headers['Pragma'] = 'no-cache';

  export default {

    data(){
      return{
        users: []
      }
    },
    methods: {
      getUsers(){
        axios.get('/api/users')
        .then((res)=>{
          console.log(res)
          this.users = res.data.users;
          console.log(this.users)
        })
      },
    }
  }
</script>
