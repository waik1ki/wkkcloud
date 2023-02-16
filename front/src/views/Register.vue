<template>
  <div class="pa-16">
    <v-text-field
      v-model="id"
      label="ID"
      hide-details="auto"
    ></v-text-field>
    <v-text-field
      v-model="password"
      label="Password"
      hide-details="auto"
    ></v-text-field>
    <v-btn class="mt-10" @click="register()">등록</v-btn>
  </div>
</template>

<script>
  import axios from 'axios'
  axios.defaults.headers['Pragma'] = 'no-cache';

  export default {
    data(){
      return{
        id:'',
        password:''
      }
    },
    methods: {
      register(){
        axios.post('/api/register/user',{
          id:this.id,
          password:this.password
        })
        .then((res)=>{
          console.log(res.data)
          if (res.data.status === "created") {
              alert("회원가입 성공!")
          }
          this.id = ""
          this.password = ""
        })
      },
    }
  }
</script>
