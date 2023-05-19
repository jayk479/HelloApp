/**
 * 
 */
	//$.ajax() 사용
	$(document).ready(function () {
		$('form').on('submit', function (e) {
			//submit 이벤트가 콜백 함수의 이벤트e를 매개값으로 받음
			e.preventDefault(); //전송차단
			// == form 태그의 submit 기능 사용 안 함
		
$.ajax({ //옵션메소드?, in javascrpt "{}" = object type
					url: 'addNotice.do',
					data: $(this).serialize(), // ex) id=12&name=hong&age=20
					method: 'post',
					dataType: 'json',
					error: function (jqxhr, textStatus, error) {
						console.log(jqxhr, textStatus, error);
					},
					success: function (data, textStatus, jqXHR) {
						console.log(data, textStatus, jqXHR);
						//data, textStatus, jqXHR
						//AddNoticControl(return "Success.json";), 
						//statusText:"success"(이건브라우저콘솔창?),
						//jqXHR:getParaemter했던거? 서버상태확인
						let ul = $('<ul />').append($('<li />').text('작성자:' + data.retVal.noticeWriter),
							$('<li />').text('제목:' + data.retVal.noticeTitle),
							$('<li />').text('내용:' + data.retVal.noticeSubject))
						$('form').after(ul);
					}
				}) // ajax 호출 끝
				//  .done(function(result) { //ajax호출 내 옵션 success랑 중복
				//  	console.log(result); //Success
				//  })
				// .fail(function (err) { ajax호출 내 옵션 error랑 중복
				// 	console.log(err);
				// })
				.always(function () {
					console.log('final.');
				})
				
						})
	});