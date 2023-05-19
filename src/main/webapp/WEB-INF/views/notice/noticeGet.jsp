<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<h3>공지사항 상세페이지(noticeGet.jsp)</h3>
<style>
#content {
	padding: 15px auto;
}
</style>
<form action="modifyNotice.do" method="GET">
	<table class="table">
		<tr>
			<th>글번호</th>
			<td><input type="text" name="nid" value="${noticeInfo.noticeId}"
				readonly></td>
		</tr>
		<tr>
			<th>제목</th>
			<td><input type="text" name="title"
				value="${noticeInfo.noticeTitle}" readonly></td>
		</tr>

		<tr>
			<th>내용</th>
			<td><textarea rows="3" cols="20" name="subject" readonly>${noticeInfo.noticeSubject}</textarea></td>
		</tr>
		<tr>
			<th>작성자</th>
			<td><input type="text" name="writer"
				value="${noticeInfo.noticeWriter}" readonly></td>
		</tr>
		<tr style="display: none;">
			<th>첨부파일:${fileType}</th>
			<td><c:if test="${noticeInfo.attachFile != null}">
					<c:choose>
						<c:when test="${fileType == 'image'}">
							<img width="200px" src="images/${noticeInfo.attachFile}">
						</c:when>
						<c:otherwise>
							<a href="images/${noticeInfo.attachFile}">${noticeInfo.attachFile}</a>
						</c:otherwise>
					</c:choose>
				</c:if></td>
		</tr>
		<td colspan="2" align="center"><c:choose>
				<c:when test="${noticeInfo.noticeWriter == id}">
					<button type="submit">수정</button>
				</c:when>
				<c:otherwise>
					<button type="submit" disabled>수정</button>
				</c:otherwise>
			</c:choose>
			<button type="button"
				onclick="location.href='noticeList.do?page=${pageNum}'">목록</button>
		</td>
	</table>
</form>

<!-- 댓글등록 -->
<div id="content">
	<input type="text" id="reply">
	<span>${id}</span>
	<button type="button" id="addBtn">등록</button>
</div>

<!-- 댓글정보 -->
<table class="table">
	<thead>
		<tr>
			<th>댓글번호</th>
			<th>작성자</th>
			<th>글내용</th>
			<th>삭제</th>
		</tr>
	</thead>
	<tbody id="tlist">
		<tr>

		</tr>

	</tbody>
</table>

<!-- 댓글수정창 -->
<table style="display:none;">
	<tbody>
		<tr class="template">
			<td>10</td>
			<td><input type="text" class="reply"></td>
			<td>user01</td>
			<td><button>수정</button></td>
		</tr>
	</tbody>
</table>

<script>
let showFields = ['replyId', 'reply', 'replyWriter'];
let xhtp = new XMLHttpRequest(); // Ajax호출
xhtp.open('get', 'replyList.do?nid=${noticeInfo.noticeId}'); //get 방식일때 replyList.do 페이지 호출
xhtp.send();

xhtp.onload = function() {
	console.log(xhtp.response);
	let tlist = document.querySelector('#tlist');
	//목록생성.
	let data = JSON.parse(xhtp.response) 
	for (let reply of data) { // 데이터 전부 가져오는 거ㅇㅇ
		console.log(reply);
		let tr = makeTrFunc(reply); //reply가 매개값으로 들어옴ㅇㅇ
		tlist.append(tr);
	}
}

//tr 생성 함수 
function makeTrFunc(reply={}){ //object 타입 변수
	let tr = document.createElement('tr');
	tr.id = reply.replyId; //tr 속성추가 : 댓글번호
	
	//this 1) Object 안에서 사용되면 Object 자체를 가리킴
	//			ex) let obj = {name : "hong", age : 20, showInfo : function(){ this.age + this.name }} => obj.age, obj.name
	//		 2) funcion 선언안에서 this는 window 전역객체 <-> 지역객체
	//			ex) function add(){ console.log(this)}
	//		 3) event 안에서 사용되는 this는 이벤트를 받는 대상ㅇㅇ 
	//			ex) document.getElementById('tlist').addEventListener('click', function(){ console.gog(this)}) => getElementById('tlist')
	
	//tr클릭이벤트
	tr.addEventListener('dblclick', function(e){ // 여기는 td
		
		if('${id}' == null || '${id}' == ''){
			alert("로그인 후에 처리하세요");
			location.href = 'loginForm.do';
			return
		}
		// 댓글작성자만수정가능
		let writer = this.children[2].innerText;
		console.log(writer, '${id}');
		if(writer != '${id}'){
			alert('권한이없습니다')
			return;
		}
		//console.log(this);
		
		// 동시에 두 개 수정 불가
		
	
		let template = document.querySelector('.template').cloneNode(true);
		//.cloneNode(true) 아래 노드 다 복제 <->.cloneNode(false) 바로 아래만 복제?
		console.log(template);
		//template.children[0].innerText = reply.replyId;
		//template.children[1].children[0].value = reply.reply;
		//template.children[2].innerText = reply.replyWriter;
		template.querySelector('td:nth-of-type(1)').innerText = reply.replyId;
		template.querySelector('td:nth-of-type(2)> input').value = reply.reply;
		template.querySelector('td:nth-of-type(3)').innerText = reply.replyWriter;
		template.querySelector('button').addEventListener('click', function(){
		//상기 선택자사용ㅇㅇ
			
			//Ajax호출
			let replyId = reply.replyId;
			let replyCon = this.parentElement.parentElement.children[1].children[0].value
			console.log(replyId, replyCon);
			
			let xhtp = new XMLHttpRequest();
			xhtp.open('post', 'modifyReply.do');
			xhtp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhtp.send('rid='+replyId+'&reply='+replyCon); // 이걸 받아서 modifyReplyControl로 감ㅇㅇ
			xhtp.onload = function(){
				let result = JSON.parse(xhtp.response);
				if(result.retCode == 'Success'){
					//화면변경
					alert('성공');
					let newTr = makeTrFunc(result.data);
					oldTr = document.querySelector('.template');
					document.getElementById('tlist').replaceChild(newTr, oldTr); 
				}else if(result.retCod == 'Fail'){
					alret('처리중에러');
				}else{
					alret('알 수 없는 반환값');
				}
			}
		});
		// 화면전환하는부분ㅇㅇ
		document.getElementById('tlist').replaceChild(template, tr); 
		//template와 기존 tr 바꿈ㅇㅇ
		//바꾸고자하는 것 기준으로 부모요소에서 써줘야됨ㅇㅇ
	})
	// td생성
	for(let prop of showFields){
	let td = document.createElement('td');
	td.innerText = reply[prop];
	tr.append(td);
	}
	// 삭제버튼
	let btn = document.createElement('button');
	btn.addEventListener('click', function(e){
		let writer = btn.parentElement.previousElementSibling.innerText;
		console.log(writer, '${id}');
		if(writer != '${id}'){
			alert('권한이없습니다')
			return;
		}
		let rid = btn.parentElement.parentElement.id;
		
		// DB에서 삭제 후 화면에서삭제
		let xhtp = new XMLHttpRequest();
		xhtp.open('post', 'removeReply.do');
		xhtp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhtp.send('rid='+rid); // 요청방식이 post일 경우에 parameter를 send() 포함
		
		xhtp.onload = function(){
			//let result = xhtp.response;
			let result = JSON.parse(xhtp.response);
			if(result.retCode == 'Success'){
				// 화면에서지우기
			 	alert('삭제');
				btn.parentElement.parentElement.remove();
			}else if(result.retCode == 'Fail'){
				alert('처리중에러발생')
			}else{
				alert('알 수 없는 결과값입니다')
			}
		}
	})
	btn.innerText = '삭제';
	let td = document.createElement('td');
	td.append(btn);
	tr.append(td);
	return tr; //생성한 tr 반환
}

// 댓글 등록 이벤트
document.querySelector("#addBtn").addEventListener('click', addReplyFnc);
function addReplyFnc(e){
	let id = document.querySelector('#content span').innerText;
	if(id == null || id == ''){
		alert("로그인 후에 처리하세요");
		location.href = 'loginForm.do';
		return
	}
	console.log('click',e.target); //이벤트 받는 속성 : e.target
	console.log('reply', document.querySelector("#addBtn").value);
	console.log('id', "${id}");
	let reply = document.querySelector("#reply").value; //insert - value 값을 넣어줌.
	
	//Ajax 호출.
	let xhtp = new XMLHttpRequest();
	xhtp.open('post', 'addReply.do');
	xhtp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');  //post 방식일 경우
	//-->key , value 형식으로 값을 넘김
	xhtp.send('id=${id}&reply='+reply+"&noticeId=${noticeInfo.noticeId}");
	xhtp.onload=function(){
		console.log(xhtp.response);
		let result = JSON.parse(xhtp.response);
		if(result.retCode=='Success'){
			//값을 활용해서 tr 생성.
			let tr = makeTrFunc(result.data);
			tlist.append(tr);
			
			//입력값초기화하기
			document.getElementById("reply").value = '';
			document.getElementById('reply').focus();
		}else if(result.retCode =='Fail'){
			alert('처리중 에러 발생')
		}
	}
}

</script>
