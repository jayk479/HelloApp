<script>
  export default {
    data(){
      return {
        user:{id : "", pw : ""}
      }
    },
    methods : {
      login() {
        console.log(this.user)
      }
    },
    created(){

    }
  }
</script>


<template>
  <div>
    <input placeholder="id" type="text" v-model="user.id">
    <input placeholder="password" type="text" v-model="user.pw">
    <button @click="login()">로그인</button>
  </div>
</template>