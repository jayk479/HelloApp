// basic2.js

//document를 jquery로 사용하기 위해 객체로?
//document가 다 실행 되었을 때?
$(document).ready(function () {
  console.log($('ul>li:nth-of-type(1)')); //==li태그 중 첫번째요소만가져옴ㅇㅇ
  $('ul>li:nth-of-type(1)').css('background', 'yellow');
  $('ul>li:nth-of-type(2)').css('color', 'red');
  //css기능 할 수 있음ㅇㅇ
  //선택자를 잘 선택해야..$(선택자).동작함수();
  //선택자는 css적 접근

  // $('#show button')[0] or $('#show button :nth-of-type(1)')
  $('#show>p>button:eq(0)').css('background', 'yellow');
  console.log($('div span:eq(1)'));
  $('#show>p:eq(1)>span').html('<b>월드</b>');
  $('div>p:nth-of-type(1)>span').css('color', 'red');

  $('div#show>p:gt(0)>span').css('background','red');
  
  $('#show2>p:not(:eq(1))>span').css('background', 'yellow');

  $('span:contains(Good)').css('fontSize', '20px');

  $('p:has(b)').css('background', 'green'); 

})