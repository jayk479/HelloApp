function init() {
  //페이지를 열었을 때 처음 설정해야 하는 부분

  // 서버와 통신
  // - 1) 전체사원조회 -> 테이블에 출력
  getEmpList();
  // - 2) 업무전체조회 -> select 태그의 option태그로 출력
  getAllJob();

  // 데이터와 무관하게 이벤트 제어
  // - 1) 등록버튼 : click
  document.getElementById('insertBtn').addEventListener('click', insertEmpInfo);
  // - 2) 수정버튼 : click
  document.getElementById('updateBtn').addEventListener('click', updateEmpInfo);
  // - 3) 선택삭제버튼 : click
  document.getElementById('checkDelBtn').addEventListener('click', delEmpList);
  // - 4) select 버튼 : change
  document.getElementById('job').addEventListener('change', printSelectJob);
  // - 5) id속성이 allCheck인 input태그 : click
  document.getElementById('allChk').addEventListener('click', isAllChecked);

}

// 전체사원조회
const headers = ['employee_id', 'name', 'job_id']; // 1) 필요한 field값을 배열로 순서대로 둔다
function getEmpList() {
  fetch('http://192.168.0.51:8081/myserver/empSelect')
    .then(response => response.json())
    .then(data => {
      //console.log(data);
      data.forEach(info => {
        createTrData(info);
      })
      // data.forEach(emp => {
      //   let trTag = document.createElement('tr');
      //   trTag.addEventListener('click', function(){

      //   })
      //   let tdTag = document.createElement('td');
      //   let inpTag = document.createElement('input');
      //   inpTag.setAttribute('type', 'checkbox');
      //   tdTag.append(inpTag);
      //   trTag.append(tdTag);
      //   tdTag = document.createElement('td');
      //   tdTag.textContent = emp.employee_id;
      //   trTag.append(tdTag);
      //   tdTag = document.createElement('td');
      //   tdTag.textContent = emp.first_name + ' ' + emp.last_name;
      //   trTag.append(tdTag);
      //   tdTag = document.createElement('td');
      //   tdTag.textContent = emp.job_id;
      //   trTag.append(tdTag);
      //   inpTag = document.createElement('input');
      //   tdTag = document.createElement('td');
      //   inpTag.setAttribute('type', 'button');
      //   inpTag.setAttribute('value', '삭제');
      //   inpTag.addEventListener('click', function(){

      //   })
      //   tdTag.append(inpTag);
      //   trTag.append(tdTag);
      //   document.getElementsByTagName('tbody')[0].append(trTag);
      // })
      // document.getElementsByTagName('table')[0].append(document.getElementsByTagName('tbody')[0]);
    })
    .catch(reject => console.log(reject))
}

//전체사원조회
function createTrData(info) {
  let trTag = document.createElement('tr');
  trTag.addEventListener('click', printEmpInfo);

  let tdTag = document.createElement('td');
  let inputTag = document.createElement('input');
  inputTag.setAttribute('type', 'checkbox');
  tdTag.append(inputTag)
  trTag.append(tdTag);

  for (let header of headers) {
    tdTag = document.createElement('td');
    let value = info[header];
    if(header == 'name'){
      value = info['first_name'] + ', ' + info['last_name'];
    }
    tdTag.textContent = value;
    trTag.append(tdTag)
  }
  tdTag = document.createElement('td');
  let btnTg = document.createElement('button');
  btnTg.textContent = 'DEL'
  btnTg.addEventListener('click', delEmpInfo)
  tdTag.append(btnTg);
  trTag.append(tdTag);

  document.querySelector('tbody').append(trTag);
}

//업무전체조회
function getAllJob() {
  fetch('http://192.168.0.51:8081/myserver/empJob')
    .then(response => response.json())
    .then(data => {
      //console.log(data);
      data.jobs.forEach(job => {
        let optTag = document.createElement('option');
        optTag.textContent = job.job_title;
        optTag.setAttribute('value', job.job_id);
        document.getElementsByTagName('select')[0].append(optTag);
      })
    })
    .catch(reject => console.log(reject))
}

// -> tr태그 click이벤트
function printEmpInfo(e) {
  if (e.target.tagName == 'BUTTON') {
    return;
  }
  let tdList = e.currentTarget.querySelectorAll('td');

  let inputList = document.querySelectorAll('form input');
  console.log(inputList);

  let tdOdj={}
  
  console.log(tdList);
  
  //console.log(tdList[0].textContent);
  //console.log(empId);
  //console.log(empId[0].innerText);

  for (let i = 0; i < tdList.length; i++){
    inputList[i].value = tdList[i].textContent;
  }   
  

}

// -> 삭제버튼 클릭이벤트
function delEmpInfo(e) {
 

}

//등록
function insertEmpInfo(e){

}

// 수정
function updateEmpInfo(e){

}

//선택된사원삭제
function delEmpList(e){

}

//selected -> input출력
function printSelectJob(e){
  let selectTag = e.currentTarget;
  let selectedVal = selectTag.options[selectTag.selectedIndex].value;
  selectTag.nextElementSibling.value = selectedVal;
}

//전체선택여부
function isAllChecked(e){
  let chTag = e.currentTarget;
  let chkInputList = document.querySelectorAll('td > input[type="checkbox"]')
  chkInputList.forEach(tag => tag.checked = chTag.checked);
  //forEach는 내부값을 가져오는 데 해당 내부값은 node값xx element 임ㅇㅇ
  //그래서 checked는 getAttribute가 아니라 .checked로 가져올 수 있음ㅇㅇ
}