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
		dataType : 'html',
		error: function(xhr) {
			console.log(xhr)
		},
		success: function(result) {
			if(result == 'Success'){
			console.log(tr);
			tr.remove(); // 여기까진 화면에서만 삭제 DB는 삭제 안 됨
			}else if(result == 'Fail'){
				alert('처리에러');
			}else{
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
	$('form').on('submit', function(e) {
		e.preventDefault(); //form의 submit 기능 차단
		//내부에서 내가 만든 코드로 비동기 처리

		//등록버튼이벤트
		var frm = $('form')[0];
		$(frm).find('input[name="job"]').val('multi');
		var data = new FormData(frm); // multipart/form-data 처리하는 객체
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
			// 둘 다 false로 지정해야 됨. why?

			error: function(jqxhr) {
				console.log(jqxhr.responseText);
			},
			success: function(data, textStatus, jqXHR) {
				$('form').after($('<p />') //this = (success에 포함되어있는?)from이벤트
					.text(
						"작성자:" + data.retVal.noticeWriter +
						"제목:" + data.retVal.noticeTitle +
						"파일:" + data.retVal.attachFile
					));
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
					$('<td />').append
						($('<img>').css('width', '50px').attr("src", 'images/' + notice.attachFile)),
				$('<td />').append($('<button />').text('삭제').on('click', deleteRow))); // 한 건 삭제
				$('#noticeList').append(tr);
			});
		}
	})

})