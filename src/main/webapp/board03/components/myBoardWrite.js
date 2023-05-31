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
                    <router-link tag="button" style="float:right" to="/boardList">목록</router-link>
                    <button style="float:right;" v-on:click="boardSave">저장</button>
              </div>`,
  data: function () {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    // boardList: function () {
    //   this.$emit('board-list');
    // },
    boardSave: function () { 
      $.ajax({
        url : 'http://192.168.0.51:8081/myserver/boardInsert',
        method : 'post',
        dataType : 'form',
        success : function(title, content){
          console.log(title, content)
          let dataArray = this.$parent.getDataArray();
          let no = 1;
          if (dataArray.length != 0) {
            let index = dataArray.length - 1;
            no = parseInt(dataArray[index].no) + 1;
            //json 내부의 모든 값은 string
          }
          let board_info = {
            'no' : no,
            'title' : this.title,
            'content' : this.content,
            'view' : 0
          }
    
          dataArray.push(board_info);
    
          this.$parent.setDataArray(dataArray);
          this.$router.push({name : 'boardList'}); // 강제로경로요청
        }
      })
      
      //this.$emit('board-save', this.title, this.content);

     
    }
  }
};