 // {name : "hong", age = 20 } => Object // 속성 : 값

 const obj = {
  days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'],
  makeThead: function () { //객체 안 함수는 메소드
    let thd = document.createElement('thead');
    let tr = document.createElement('tr');
    for (let day of this.days) {
      //this는 object임ㅇㅇ
      //console.log(day);
      let th = document.createElement('th');
      th.innerText = day;
      tr.append(th);
    }
    thd.append(tr);
    return thd;
  },
  makeTbody: function (month) {
    let tbd = document.createElement('tbody');
    let tr = document.createElement('tr');
    
    for(let i = 0; i <this.getFirstDay(month); i++){
      tr.append(document.createElement('td'));
    }
    for (let i = 1; i <= this.getLastDate(month); i++) {
      let td = document.createElement('td');
      td.innerText = i;
      tr.append(td);
      if ((i+this.getFirstDay(month)) % 7 == 0) {
        tbd.append(tr);
        tr = document.createElement('tr');
      }
    }
    //console.log(tbd);
    tbd.append(tr);
    return tbd;
  },
  makeTable(month, elem) {
    let tbl = document.createElement('table');
    tbl.append(this.makeThead());
    tbl.append(this.makeTbody(month)); 
    //현재의 this는 해당 object가 가지고 있는 메소드 가져옴이라는 뜻
    elem.append(tbl);
  },
  getFirstDay(month) {
    if (month == 5) {
      return 1;
    } else if (month == 6) {
      return 4;
    }
  },
  getLastDate(month) {
    if (month == 5) {
      return 31;
    } else if (month == 6) {
      return 30;
    }
  }
}

// #show에 하위요소로
//show.append(obj.makeTable(6));
obj.makeTable(5, show);