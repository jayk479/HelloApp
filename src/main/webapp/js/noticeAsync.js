/**
 * noticeAsync.js
 */

//asyn function()/...

async function loadData() { //await 는 async 함수 안에ㅇㅇ
	let promise = await fetch('noticeListJson.do');
	let promise1 = await promise.json(); //json -> object
	let fields = ['noticeId', 'noticeTitle', 'noticeWriter', 'noticeSubject', 'attachFile'];
	promise1.forEach(function(item) {
		console.log(item);
		let tr = document.createElement('tr');
		for (let prop of fields) {
			let td = document.createElement('td');
			td.innerText = item[prop];
			tr.append(td);
		}
		document.getElementById('noticeList').append(tr);
	});
}

document.addEventListener('DOMContentLoaded', function() {
	//페이지가 다 로딩 된 다음에
	loadData()
})