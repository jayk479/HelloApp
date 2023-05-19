let mon = 5;
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];

    function makeCalendar(month){

      //start table생성
      let tbl = document.createElement('table');
      tbl.border = '1';
  
      //thead생성
      let thd = document.createElement('thead');
      let tr = document.createElement('tr');
  
      //th생성
      for (let day of days) {
        let th = document.createElement('th');
        th.innerText = day;
        tr.append(th);
      }
      thd.append(tr);
      tbl.append(thd);
    
  
      //tbody생성
      let tbd = document.createElement('tbody');
      tr = document.createElement('tr');
  
      //5월1일의위치지정
      for (let i = 0; i < getFirstDay(month); i++) {
        tr.append(document.createElement('td'));
      }
  
      for (let i = 1; i <= getLastDate(month); i++) {
        //DOM을 활용해서 달력 생성
        let td = document.createElement('td');
        td.innerText = i;
        tr.append(td);
        if ((i + getFirstDay(month)) % 7 == 0) { // 7일마다 줄바꿈
          tbd.append(tr)
          tr = document.createElement('tr');
        }
  
      //색깔지정
      if ((i + getFirstDay(month)) % 7 == 0) { 
          td.style.backgroundColor = 'red';
          td.style.color = 'yellow';
        }else if((i+getFirstDay(month))%7 == 1){
          td.style.backgroundColor = 'blue';
          td.style.color = 'yellow';
        }
      }
  
      tbd.append(tr); //마지막 생성된 tr보여줌
      tbl.append(tbd);
      //end table생성

      return tbl;
    }

    //#show 하위 요소로 등록.
    document.getElementById('show').append(makeCalendar(6));

    //첫번째 날짜의 값을 반환해주는 함수
    //월정보를 받고 첫번째 날짜의 값을 반환해주는 함수

    function getFirstDay(month) {
      if (month == 5) {
        return 1;
      } else if (month == 6) {
        return 4;
      }
    }

    //월정보를 받고 마지막날짜 반환해주는 함수
    function getLastDate(month) {
      if (month == 5) {
        return 31;
      } else if (month == 6) {
        return 30;
      }
    }