export default {
  name: 'my-board-write',
  template: `<div>
                    <table id="list">
                      <tr>
                          <td>글제목</td>
                          <td><input type="text" style="width:90%;" v-model="title"></td>
                      </tr>
                      <tr>
                          <td colspan="2">
                              <textarea style="width:100%;" v-model="content"></textarea>
                          </td>
                      </tr>
                    </table>
                    <router-link tag="button" style="float:right" v-bind:to="{name : 'boardList'}">목록</router-link>
                    <button style="float:right;" v-on:click="boardSave">저장</button>
              </div>`,
  data: function () {
    return {
      title: '',
      content: '',
      dataArray: []
    }
  },
  methods: {
    // boardList: function () {
    //   this.$emit('board-list');
    // },
    boardSave: function () {
      // $.ajax({
      //   url : 'http://192.168.0.51:8081/myserver/boardInsert',
      //   method : 'POST',
      //   data : {
      //     title : this.title,
      //     content : this.content
      //   },
      //   success : function(){
      //     //console.log(title, content)
      //     let dataArray = this.dataArray;
      //     let no = 1;
      //     if (dataArray.length != 0) {
      //       let index = dataArray.length - 1;
      //       no = parseInt(dataArray[index].no) + 1;
      //       //json 내부의 모든 값은 string
      //     }
      //     let board_info = {
      //       'no' : no,
      //       'title' : this.title,
      //       'content' : this.content,
      //       'view' : 0
      //     }

      //     dataArray.push(board_info);

      //     //this.$parent.setDataArray(dataArray);
      //     this.$router.push({name : 'boardList'}); // 강제로경로요청
      //   }
      // })

      //this.$emit('board-save', this.title, this.content);

      // 등록 get방식
      // let sendData = new FormData();
      // sendData.append('title', this.title);
      // sendData.append('content', this.content);
      // fetch('http://192.168.0.51:8081/myserver/boardInsert?title='+this.title+'&content='+this.content)
      //   .then(response => response.json())
      //   .then(data => console.log(data))
      //   .catch(err => console.log(err))
      //this.$router.push({name : 'boardList'}); 

      // 등록 post방식
      // fetch('http://192.168.0.51:8081/myserver/boardInsert', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/x-www-form-urlencoded'
      //     },
      //     body: new URLSearchParams({
      //       title: this.title,
      //       content: this.content
      //     })
      //   })
      //   .then(response => response.json())
      //   .then(data => console.log(data))
      //   .catch(err => console.log(err))

      //등록 post방식 2
      fetch('http://192.168.0.51:8081/myserver/boardInsert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: this.title,
          content: this.content
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.$router.push({name: 'boardList'});
      })
      .catch(err => console.log(err))

      //       {
      //         if (response.ok) {
      //           let dataArray = this.$parent.getDataArray();
      //           let no = 1;
      //           if (dataArray.length != 0) {
      //             let index = dataArray.length - 1;
      //             no = parseInt(dataArray[index].no) + 1;
      //             // json 내부의 모든 값은 string
      //           }
      //           let board_info = {
      //             'no': no,
      //             'title': this.title,
      //             'content': this.content,
      //             'view': 0
      //           };

      //           dataArray.push(board_info);

      //           this.$parent.setDataArray(dataArray);
      //           this.$router.push({
      //             name: 'boardList'
      //           }); // 강제로 경로 요청
      //         } else {
      //           console.log('Error:', response.statusText);
      //         }
      //       })
      //       .catch(err => {
      //         console.log(err);
      //       });
      //   }


    }

  }

};