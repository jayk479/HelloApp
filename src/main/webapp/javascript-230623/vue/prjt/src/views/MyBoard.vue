

<script>
import BoardReg from '@/components/BoardReg.vue'

  export default {
    data(){
      return{
        boards : []
      }
    },
    mounted(){
    
      fetch('https://dummyjson.com/posts')
      .then(result => result.json())
      .then(data => {
        //console.log(data);
        data.posts.forEach(data => {
          this.boards.push(data);
        })
      })
      .catch(err => console.log(err))
    },
    components: {
    BoardReg
  }
  }
</script>

<template>
  <div class="container">
    <div class="col-8">
      <table>
      <thead>
        <th>id</th>
        <th>title</th>
        <th>userId</th>
        <th>reactions</th>
        <!-- <th>tags</th> -->
      </thead>
      <tbody>
        <tr v-for="board in boards" :key="board.id">
          <td>{{ board.id }}</td>
          <td>{{ board.title }}</td>
          <td v-text="board.userId"></td>
          <td v-text="board.reactions"></td>
          <!-- <td v-text="board.tags"></td> -->
        </tr>
      </tbody>
    </table>
    </div>
    <div class="col-4">
      <BoardReg></BoardReg>
    </div>
  </div>
</template>

<style>


</style>