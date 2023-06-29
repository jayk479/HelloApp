<script>
  export default {
    data(){
      return {
        post : {id:"", title:"", body:"", userId:"", reactions: 0},
        boards : []
      }
    },
    methods : {
      insertBoard(){
        this.boards.push(this.post);
        console.log(this.boards);
      }
    }
  }
</script>

<template>
  <div>
    <input type="text" placeholder="id" v-model="post.userId">
    <input type="text" placeholder="title" v-model="post.title">
    <input type="text" placeholder="text" v-model="post.body">
    <button @click="insertBoard()">입력</button>
  </div>
</template> 