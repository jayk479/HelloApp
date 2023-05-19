//fetchMember.js

$(function () {
  $('#list').remove();
  $('#show2').remove();
  $('#show').empty();
  $('#show').before('<h3>회원목록</h3>')

  // json테이터출력
  fetch('MOCK_DATA.json')
    .then(function (resolve) {
      return resolve.json();
      // 출력 stream의 값을 javascript의 object type으로 변경
    })
    .then(makeList)
    .catch(function (err) {
      console.log(err);
    }) // end of fetch()

  //등록버튼이벤트추가
  $('button:contains(등록)').on('click', addMemberFnc);
  $('button:contains(변경)').on('click', updateMemberFnc);
  $('button:contains(선택된tr이동)').on('click', changePosition);
  
  function addMemberFnc() {
    // 사용자입력값을체크, 목록의 제일 마지막 위치에 추가
    // let id = $('#id').val()
    // let fname = $('#firstName').val()
    // let lname = $('#lastName').val()
    // let gender = $('#gender').val()
    //console.log(id, fname, lname, gender)
    if (!$('#id').val() || !$('#firstName').val() || !$('#lastName').val() || !$('#gender').val()) {
      alert('등록불가');
    } else {
      let tr = $('<tr />').append($('<td />').text($('#id').val()),
        $('<td />').text($('#firstName').val()),
        $('<td />').text($('#lastName').val()),
        $('<td />').text($('#gender').val()),
        $('<td />').append($('<button>삭제</button>').on('click', delMember)));
      $('#memberlist').append(tr);
    }
  }

  //라이브이벤트
  $('body').on('dblclick', '#memberlist tr', function () {
    console.log('tr click');
    // 새로운 tr생성
    let oldTr = $(this);
    let oldId = $(this).children().eq(0).text();
    let oldFname = $(this).children().eq(1).text();
    let oldLname = $(this).children().eq(2).text();
    let oldGender = $(this).children().eq(3).text();
    let newTr = $('<tr />').append(
      $('<td />').text(oldId),
      $('<td />').append($('<input />)').val(oldFname)),
      $('<td />').html('<input type="text" value="' + oldLname + '">'),
      $('<td />').html(oldGender),
      $('<td />').append($('<button />').text('수정').on('click', updateTr))
    );
    oldTr.replaceWith(newTr);
    console.log(oldTr);
  })

  function updateTr() {
    let oldTr = $(this).parentsUntil('tbody');

    let id = oldTr.find('td:eq(0)').text();
    let fname = oldTr.find('td:eq(1)>input').val();
    let lname = oldTr.find('td:eq(2)>input').val();
    let gender = oldTr.find('td:eq(3)').text();
    //console.log(fname);
    let newTr = $('.template').clone();
    newTr.find('td:eq(0)').text(id);
    newTr.find('td:eq(1)').text(fname);
    newTr.find('td:eq(2)').text(lname);
    newTr.find('td:eq(3)').text(gender);
    newTr.toggleClass('template');
    oldTr.replaceWith(newTr);
    //console.log(newTr)
  }

  function makeList(result) {
    console.log(result);
    let tbl = $('<table border="1" />');
    let tbd = $('<tbody />').attr('id', 'memberlist');
    result.forEach(function (member, idx) {
      if (idx < 5) { // 전체목록 중 5개만 출력
        let tr = $('<tr />').append($('<td />').text(member.id),
          $('<td />').text(member.first_name),
          $('<td />').text(member.last_name),
          $('<td />').text(member.gender),
          //버튼작성
          $('<td />').append($('<button>삭제</button>').on('click', delMember)),
          //체크박스
          $('<td />').append($('<input />').attr('type', 'checkbox'))
        );
        tbd.append(tr);
      }
    });
    tbl.append(tbd);
    $('#show').append(tbl);
    makeHeader();
  }

  function makeHeader() {
    // title 등록
    $('table:eq(1)').append(
      $('<thead />').append($('<th />').text('ID'),
        $('<th />').text('FIRST_NAME'),
        $('<th />').text('LAST_NAME'),
        $('<th />').text('GENDER'),
        $('<th />').text('삭제'),
        $('<th />').html('<input type="checkbox" />')
      )
    );
  }

  // 한 라인 삭제
  function delMember(e) {
    //console.log(e.target); // <button>삭제</button> dom객체
    $(e.target).parentsUntil('tbody').remove();
  }

  //id값 일치하면 변경
  function updateMemberFnc() {
    let searchId = $('#id').val();
    //console.log(searchId);
    let trs = $('#memberlist tr')
    //console.log(trs);
    for(var i = 0; i < trs.length; i++){
      let oldTr = $(trs[i]);
      console.log(searchId, $(trs[i]).children().eq(0).text())
      if (searchId == $(trs[i]).children().eq(0).text()) {
        let newTr = $('<tr />').append($('<td />').text($('#id').val()),
          $('<td />').text($('#firstName').val()),
          $('<td />').text($('#lastName').val()),
          $('<td />').text($('#gender').val()),
          $('<td />').append($('<button>삭제</button>').on('click', delMember)),
          $('<td />').append($('<input />').attr('type', 'checkbox')));
        oldTr.replaceWith(newTr);
      }
    }
    //console.log(id);
  }

  //checkbox 된 거 아래로 이동
  function changePosition () {
    let targetTr = $('input[type="checkbox"]:checked').closest('tr');
    //console.log(targetTr)
    targetTr.next().after(targetTr);
  }

  //tr에 마우스오버가 되면 등록화면에 출력 되도록
  $('body').on('mouseleave', '#memberlist tr td', function () {
    //console.log($('td').val());
  })


})