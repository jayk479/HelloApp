  //basic.js
  
  // document.addEventListener('DOMContentLoaded', function () { //
    //   let liTag = document.createElement('li'); //Document Object Model 
    //   liTag.innerText = 'cherry';
    //       console.log(liTag);
    //       liTag.append()
    //       //cuz liTag가 객체타입ㅇㅇ javascript객체 
    //  document.querySelector('#list').append(liTag);
    // })

    //javascript객체 vs. jquery객체
    
    
    //상기와 같은 내용을 jquery로 한다면 이하
    $(document).ready(function(){
      //jQuery객체 만들어줌() DOM이랑 비슷함ㅇㅇ
      // let elem = $('<li />'); //jquery == $ jquery객체발생
      //elem.innerText 이런 javascript 사용 못 함
      //jquery에서 제공하는 함수만 사용 가능
      //elem.text('cherry');
      //console.log(elem);
      //하나밖에없는데배열임
  
      $('#list').append($('<li />').text('Cherry'), 
                          $('<li />').text('mango'));
      //메소드체인 append는 여러개도가능
    })