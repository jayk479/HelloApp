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

  //최초 자료는 삭제 후 다시 자료 뿌림 
  // => 신규데이터 추가, 또는 수정 등으로 달라진 자료를 위해
  document.getElementsByTagName('tbody')[0].replaceChildren();
  // replaceChildren() 대체하는 부분을 명시하지 않으면 다 삭제하기 때문에
  // 원래는 대체하는 메소드임ㅇㅇ

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

  for (let header of headers) { // 2) headers 배열 순서에 맞춰서 값 가져옴ㅇㅇ 
    // ++ 기본적으로 headers에 있는 값에 맞춰서 가져오지만
    // 다른 이름으로 지칭했을 때는 값 셋팅하면 됨ㅇㅇ
    // 데이터를 꺼내올 때! 제어문으로 가공 할 수 있음
    tdTag = document.createElement('td');
    let value = info[header];
    if (header == 'name') {
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
      //내부에 필드값 지정해서 배열로 만들 수 있음ㅇㅇ
      //이것도 객체죠 //돌아오는 데이터의 모습을 확인해야됨ㅇㅇ
      data.jobs.forEach(job => {
        let optTag = document.createElement('option');
        optTag.textContent = job.job_title; // 사용자에게 보여주는 값
        optTag.setAttribute('value', job.job_id); // DB에서 다루는 값
        document.getElementsByTagName('select')[0].append(optTag);
      })
    })
    .catch(reject => console.log(reject))
}

// -> tr태그 click이벤트
function printEmpInfo(e) {
  
  // 정답
  if(e.target.tagName == 'INPUT') return;
  
  let trTag = e.currentTarget;
  let empId = trTag.children[1].textContent;
  // 선택자별로 0부터 1부터 시작함

  fetch('http://192.168.0.51:8081/myserver/empFind?employee_id=' + empId)
    .then(resolve => resolve.json())
    .then(data => {
      //console.log(data);
      prinintSelectedEmp(data);

    })
    .catch(reject => console.log(reject))


  // self
  // if (e.target.tagName == 'BUTTON') {
  //   return;
  // }
  // let tdList = e.currentTarget.querySelectorAll('td');
  // let empId = tdList[1].textContent;

  // fetch('http://192.168.0.51:8081/myserver/empFind?employee_id=' + empId)
  //   .then(resolve => resolve.json())
  //   .then(data => {
  //     let keys = Object.keys(data);
  //     let inputList = document.querySelectorAll('form input');
  //     for (i = 0; i < inputList.length; i++) {
  //       for (j = 0; j < keys.length; j++) {
  //         let key = keys[j];
  //         if (inputList[i].getAttribute('name') == keys[j]) {
  //           inputList[i].value = data[key];
  //         }
  //       }
  //     }
  //     //console.log(data);
  //     //return data;
  //     // input value에 맞춰 select의 option바꿔주기

  //   })
  //   .catch(reject => console.log(reject))
}

/*
let inputArray = [
  { 'id' : 'employee_id' },
  { 'lName' : 'last_name' }
]
//만약 input의 속성? 값? 이 DB컬럼명과 일치하지 않을 때
//일치하게 만드는 배열 하나 따로 만들어주고 
 */

// 상단 Form에 다시 넣기
function prinintSelectedEmp(obj) {
  let inputList = document.querySelectorAll('form input');
  inputList.forEach(tag => {
    let objVal = obj[tag.name];
    if (tag.name == 'hire_date') {
      //숫자를 날짜로 변환
      objVal = getHireDate(obj[tag.name]);
    }
    tag.value = objVal;

    // job_id에 맞춰서 option도 바꿔주는 거
    if (tag.name == 'job_id') {
      tag.previousElementSibling.value = tag.value;
    }
  })

  /*
  // 사실상 form태그 안 input에서는 서버와 통신시 수월하도록 name지칭함ㅇㅇ
  // name은 css에서도 잘 사용안하고
  // 일치하는 값에 맞춰 값 넣게 하는 코드 작성(test)
  for(let input of inputArray){
    for(let field in input){
      let inputTag = document.querySelector('input[name="' + field + '"]');
      inputTag.value = obj[input[field]];
    }
  }
  */
}

// 날짜포맷
function getHireDate(date) {
  let hireDate = new Date(date);
  //Date()를 매개변수x => sysdate, 매개변수o 변환ㅇㅇ숫자도가능ㅇ
  let year = hireDate.getFullYear();
  let month = ('0' + (hireDate.getMonth() + 1)).slice(-2);
  //월은 0부터 시작함 //일단 앞에 0붙이고 뒤에서 2글자 잘라내기. 공식임ㅇㅇin javascript
  let day = ('0' + (hireDate.getDate())).slice(-2);

  return `${year}-${month}-${day}`;
}

// from 해광
// //단건 조회 후 form에 출력;
// function formData(emp) {
//   let inputList = document.querySelectorAll('form input');
//   inputList.forEach(input => {
//     let name = input.getAttribute('name');
//     if (name != 'hire_date') {
//       input.value = emp[name];
//     } else {
//       let hireDate = new Date(emp[name])
//       let year = hireDate.getFullYear();
//       let month = (hireDate.getMonth() + 1) < 10 ? '0' + (hireDate.getMonth() + 1) : (hireDate.getMonth() + 1);
//       let date = hireDate.getDate() < 10 ? '0' + hireDate.getDate() : hireDate.getDate();
//       input.value = year + '-' + month + '-' + date;
//     }
//     if (name == 'job_id') {
//       document.querySelector('#job').value = emp[name];
//     }
//   });
// }



// -> 삭제버튼 클릭이벤트
function delEmpInfo(e) {

  //정답
  let trTag = e.currentTarget.closest('tr');
  let empId = trTag.querySelector('td:nth-child(2)').textContent;

  //post방식은 두번째 매개변수로 객체를 보내줘야됨ㅇㅇㅇ
  fetch('http://192.168.0.51:8081/myserver/empDelete', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        'employee_id': empId
      })
    })
    .then(response => response.json())
    .then(data => {
      //console.log(data);
      let empTg = document.querySelectorAll('tbody tr > td:nth-child(2)');
      empTg.forEach(tag => {
        if (tag.textContent == data['employee_id']) {
          tag.parentNode.remove();
        }
      })
    })
    .catch(err => console.log(err));

  e.stopPropagation();
  // 버블링제어는 이거만 있는 거 아님 
  // => 해당 메소드는 하위요소가 없는 것들에만 반응함?

  // self
  // if (e.target.tagName != 'BUTTON') {
  //   return;
  // }
  // let tdList = e.target.closest('tr').querySelectorAll('td');
  // let empId = tdList[1].textContent;
  // //console.log(empId);

  // fetch('http://192.168.0.51:8081/myserver/empDelete', {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       'employee_id': empId
  //     })
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data.employee_id);
  //     location.reload();
  //   })
  //  .catch(err => console.log(err));
}

//등록/수정 같이 사용하는 코드
function getFormInfo() {
  //비어있는 객체는 JavaScript를 벗어나면 코드수정 필요함
  let empInfo = {};
  let inputList = document.querySelectorAll('form input');

  inputList.forEach(input => {
    empInfo[input.name] = input.value;
  })

  return empInfo;
}

//등록
function insertEmpInfo(e) {

  //정답
  let info = getFormInfo();

  fetch('http://192.168.0.51:8081/myserver/empInsert', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(info)
    })
    .then(response => response.json())
    .then(data => {
      //console.log(data);
      // not reload()사용하는 게 아니고, 새로 데이터 받아와서 뿌려줘
      // getEmpList(); 
      // 기존 자료에 똑같은 내용 또 붙임 
      // 그래서 기존 DATA 지우고 다시 뿌려줌ㅇㅇ
      getEmpList();

    })
    .catch(err => console.log(err))

  //self
  // console.log(e.target);
  // let inputList = document.querySelectorAll('form input');
  // let userObj = {};
  // inputList.forEach(info => {
  //   userObj[info.getAttribute('name')] = info.value;
  // })

  // fetch('http://192.168.0.51:8081/myserver/empInsert', {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json'
  //     },
  //     body: JSON.stringify(userObj)
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     //console.log(data);
  //     createTrData(data);
  //   })
  //   .catch(err => console.log(err))
}

// 수정
function updateEmpInfo(e) {

  //정답
  let info = getFormInfo();

  fetch('http://192.168.0.51:8081/myserver/empUpdate', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(info)
    })
    .then(response => response.json())
    .then(data => {
      getEmpList();
    })
    .catch(err => console.log(err))

  // 해당건은 등록, 수정의 차이가 없음. 이건 구분해야됨ㅇㅇ

  // self
  // let empId = document.querySelector('input[name="employee_id"]').value;
  // let empInfo = {};

  // let inputList = document.querySelectorAll('form input');
  // inputList.forEach(input => {
  //   empInfo[input.getAttribute('name')] = input.value;
  // });

  // fetch('http://192.168.0.51:8081/myserver/empUpdate?employee_id=' + empId, {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json'
  //     },
  //     body: JSON.stringify(empInfo)
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data);
  //     location.reload();
  //   })
  //   .catch(err => console.log(err));
}

//선택된사원삭제
function delEmpList(e) {

  //정답
  let checked = document.querySelectorAll('input[type="checkbox"]:checked');
  //  let inputs = document.querySelectorAll('td > input[type="checkbox"]');
  //  inputs.forEach(input => console.log(input.checked))
  let empList = [];
  
  checked.forEach(input => {
    let empId = input.parentNode.nextElementSibling.textContent;
    empList.push({ 'employee_id' : empId });
  });
  // node랑 element랑 뭔 차이임?
  fetch('http://192.168.0.51:8081/myserver/empListDelete', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(empList)
    })
    .then(response => response.json())
    .then(data => {
      //console.log(data);
      //console.log(data.data);
      //console.log(data.total);
      // alert('삭제건수 : ' + data.success + '삭제된 empId : ' + data.data);
      let total = data.total;
      let success = data.success;
      let delEmps = data.data.toString();

      let massage = `삭제를 요청한 ${total}건 중 ${success}건을 삭제했습니다. \n 대상사원 : ${delEmps}`;
      alert(massage);

      getEmpList();
    })
    .catch(err => console.log(err))


  // self
  // let chkList = document.querySelectorAll('td > input[type="checkbox"]');
  // let checkedList = [];
  // let empIdList = [];

  // chkList.forEach(chk => {
  //   if (chk.checked) {
  //     checkedList.push(chk);
  //   }
  // })

  // checkedList.forEach(checked => {
  //   let empId = checked.closest('tr').querySelectorAll('td')[1].textContent;
  //   //console.log(empId);
  //   empIdList.push(empId);
  // });
  // //console.log(empIdList[0])

  // let checkedImpIdArr = [];
  // for (let i = 0; i < empIdList.length; i++) {
  //   let obj = {
  //     'employee_id': empIdList[i]
  //   }
  //   checkedImpIdArr.push(obj);
  // }
  // //console.log(checkedImpIdArr);

  // fetch('http://192.168.0.51:8081/myserver/empListDelete', {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json'
  //     },
  //     body: JSON.stringify(checkedImpIdArr)
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     //console.log(data.length);
  //     getEmpList();
  //   })
  //   .catch(err => console.log(err))

  //e.stopPropagation();
}

//selected -> input출력
function printSelectJob(e) {
  let selectTag = e.currentTarget;
  let selectedVal = selectTag.options[selectTag.selectedIndex].value;
  selectTag.nextElementSibling.value = selectedVal;
}

//전체선택여부
function isAllChecked(e) {
  let chTag = e.currentTarget;
  let chkInputList = document.querySelectorAll('td > input[type="checkbox"]')
  chkInputList.forEach(tag => tag.checked = chTag.checked);
  //forEach는 내부값을 가져오는 데 해당 내부값은 node값xx element 임ㅇㅇ
  //그래서 checked는 getAttribute가 아니라 .checked로 가져올 수 있음ㅇㅇ
}