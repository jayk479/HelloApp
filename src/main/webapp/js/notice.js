/**
 * notice.js
 */

function deleteRow() {
	//ajax호출. ID를 기준으로 삭제 후 화면에서 제거
	//this == tr
	let tr = $(this).closest('tr');
	let id = tr.children().eq(0).text();
	console.log(id);
	$.ajax({
		url: 'removeNoticeJson.do?nid=' + id,
		dataType: 'html',
		error: function(xhr) {
			console.log(xhr)
		},
		success: function(result) {
			if (result == 'Success') {
				console.log(tr);
				tr.remove(); // 여기까진 화면에서만 삭제 DB는 삭제 안 됨
			} else if (result == 'Fail') {
				alert('처리에러');
			} else {
				alert('알 수 없는 반환')
			}
		}
	})
		.always(function() {
			console.log('final')
		})
}


// multipart request
$(document).ready(function() {


	//modal처리, 라이브이벤트처리 == 추후 추가된 요소들에도 적용됨ㅇㅇ
	$('#noticeList').on('dblclick', 'tr', function() {
		//ajax호출 nid 활용
		let id = $(this).children().eq(0).text();
		console.log(id);
		$.ajax({
			url: 'getNoticeJson.do',
			dataType: 'json',
			error: function(xhr) {
				console.log(xhr)
			},
			success: function(data) { //data == vo
				console.log(data);
				$('.nid').text(data.noticeId);
				$('.nTitle').text(data.noticeTitle);
				$('.nWriter').text(data.noticeWriter);
				$('.nSubject').val(data.noticeSubject);
				$('.nFile').css('width', '100px').attr('src', 'images/' + data.attachFile)
			}
		})
		$('#myModal').css('display', 'block');
	})

	$('span.close').on('click', function() {
		$('#myModal').css('display', 'none')
	})

	$(window).on('click', function(e) {
		console.log(e.target, $('#myModal')[0]);

		if (e.target == $('#myModal')[0]) {
			$('#myModal').css('display', 'none');
		}
	})

	//modal 창에 있는 이미지를 클릭
	$('img.nFile').on('click', function() {
		$('#attachFile').click(); //trigger event
	})

	//파일 선택하면 change이벤트
	$('#attachFile').on('change', function(e) {
		//게시글번호, 파일 => 서버전송 : nid 기준으로 attach 수정.
		console.log(e.target.files[0]); //ajax 호출 전에 이벤트 받는 대상 출력

		let data = new FormData(); //multipart data 수정 시
		data.append('nid', $('.nid').text());
		data.append('nFile', e.target.files[0]);

		console.log(data);
		data.append('nfile', $())
		$.ajax({
			url: 'modifyNoticeFile.do?nid='+id,
			method: 'post',
			data: data,
			// multipart요청
			contentType: false,
			processData: false,
			error: function() {

			},
			success: function(data) {

			}
		});
	})

	$('form').on('submit', function(e) {
		e.preventDefault(); //form의 submit 기능 차단
		//내부에서 내가 만든 코드로 비동기 처리

		//등록버튼이벤트
		var frm = $('form')[0];
		$(frm).find('input[name="job"]').val('multi');
		var data = new FormData(frm); // FormData() multipart/form-data 처리하는 객체
		for (let val of data.entries()) { // .entries()
			console.log(val);
		}
		$.ajax({
			url: 'addNotice.do',
			method: 'post',
			data: data,
			// multipart요청
			contentType: false,
			processData: false,
			// 둘 다 false로 지정해야 됨. 처리 안 되도록ㅇㅇ

			error: function(jqxhr) {
				console.log(jqxhr.responseText);
			},
			success: function(data, textStatus, jqXHR) {
				let val = data.retVal;
				if (data.retCode == 'Success') {
					let tr = $('<tr />').append($('<td />').text(val.noticeId),
						$('<td />').text(val.noticeTitle),
						$('<td />').text(val.noticeWriter),
						$('<td />').append($('<img>').css('width', '50px').attr("src", 'images/' + val.attachFile)),
						$('<td />').append($('<button />').text('삭제').on('click', deleteRow)));
					$('#noticeList').prepend(tr);
					$('form')[0].reset();
					//초기화하는거ㅇㅇ 폼의 reset이벤트호출
					// 몇 번째 form인지 적혀있어야됨ㅇㅇ

				} else if (data.retCode == 'Fail') {
					alert('처리중 에러 발생')
				} else {
					alert('알 수 없는 반환값')
				}
				// $('form').after($('<p />') //this = (success에 포함되어있는?)from이벤트
				// 	.text(
				// 		"작성자:" + data.retVal.noticeWriter +
				// 		"제목:" + data.retVal.noticeTitle +
				// 		"파일:" + data.retVal.attachFile
				// 	));
			}
		})
			.always(function() {
				console.log('final');
			})
	}) //end of 등록

	//공지목록출력
	$.ajax({
		url: 'noticeListJson.do',
		method: 'get',
		dataType: 'json',
		error: function(xhr) {
			console.log(xhr.responseText);
		},
		success: function(data) {
			console.log(data);
			data.forEach(function(notice) {
				let tr = $('<tr />').append($('<td />').text(notice.noticeId),
					$('<td />').text(notice.noticeTitle),
					$('<td />').text(notice.noticeWriter),
					$('<td />').append($('<img>').css('width', '50px').attr("src", 'images/' + notice.attachFile)),
					$('<td />').append($('<button />').text('삭제').on('click', deleteRow))); // 한 건 삭제
				$('#noticeList').append(tr);
			});
		}
	})

})