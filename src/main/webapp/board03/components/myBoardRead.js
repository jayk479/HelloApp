export default {
  name : 'my-board-read',
  template: `<div>
                  <table id="list">
                    <tr>
                        <td style="width:50px;">글제목</td>
                        <td>{{ item.title }}</td>
                    </tr>
                    <tr style="height:300px">
                      <td colspan="2">{{ item.content }}</td>
                    </tr>
                  </table>
                  <!--<button style="float:right;" v-on:click="boardList">목록</button>-->
                  <router-link tag="button" style="float:right" to="/boardList">목록</router-link>
              </div>`,
  props: ['item']
};