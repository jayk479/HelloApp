export default {
  name: 'my-board-list',
  template: `<div>
                  <table id="list">
                      <tr>
                          <th style="width:50px;">글번호</th>
                          <th>글제목</th>
                          <th style="width:50px;">조회수</th>
                          <th style="width:70px;"></th>
                      </tr>
                      <tr v-for="item in object" v-bind:key="item.no">
                          <td>{{item.no}}</td>
                          <!-- <td v-on:click="boardRead(item)">{{item.title}}</td> -->
                          <!--<router-link tag="td" v-bind:to="{ name : 'boardRead', params : {item : item}}">{{item.title}}</router-link>-->
                          <td v-on:click="boardRead">{{item.title}}</td>
                          <td>{{item.view}}</td>
                          <td><button v-on:click="boardDelete(item.no)">삭제</button></td>
                      </tr>
                  </table>
                  <!--<button style="float:right;" v-on:click="boardWrite">글쓰기</button>-->
                  <router-link tag="button" style="float:right;" to="/boardWrite">글쓰기</router-link>
              </div>`,
  // props: ['object'],
  data: function () {
    return {
      object: [],
    }
  },
  created: function () { //DOM 등록전
    // fetch('http://192.168.0.51:8081/myserver/boardAll')
    //   .then(response => response.json())
    //   .then(data => {
    //     //console.log(data);
    //     this.object = data;
    //   })
    //   .catch(err => console.log(err));

      $.ajax({
        url : 'http://192.168.0.51:8081/myserver/boardAll',
        success : function(data){
          this.object = data;
        },
        error: err=> console.log(err)
      })
  },
  methods: {
    boardDelete: function (no) {
      $.ajax({
        url : `http://192.168.0.51:8081/myserver/boardDelete`,
        method : 'POST',
        data: { no: no },
        success : function(){
          //console.log(this.$parent.getDataArray());
          const index = this.object.findIndex(item => item.no === no);
          if (index !== -1) {
            this.object.splice(index, 1);
        }
      },
      error: err => console.log(err)
    })

      // fetch(`http://192.168.0.51:8081/myserver/boardDelete`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ no: no })
      // })
      //   .then(response => {
      //     if (response.ok) {
      //       const index = this.object.findIndex(item => item.no === no);
      //       if (index !== -1) {
      //         this.object.splice(index, 1);
      //       }
      //     } else {
      //       throw new Error('Failed to delete board');
      //     }
      //   })
      //   .catch(err => console.log(err));
    
  },
  boardRead:function(no){
    
    $.ajax({
      url : `http://192.168.0.51:8081/myserver/boardInfo?no=${no}`,
      method : 'GET',
      success : function(response){
        const boardInfo = response.data;
        this.title = boardInfo.title;
        this.content = boardInfo.content;
        this.$router.push({ name: 'boardRead', params: { no : boardInfo.id } });
      },
      error : function(err){
        console.log(err);
      }
    })
  }

}
};
