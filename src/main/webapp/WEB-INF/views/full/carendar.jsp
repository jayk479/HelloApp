<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
<meta charset='utf-8' />
<script src='/fullcal/dist/index.global.js'></script>
<script>
    // DOM요소가 다 다운로드되고나면(이벤트명)
    document.addEventListener('DOMContentLoaded', function () {
      var calendarEl = document.getElementById('calendar');
      // in javascript 에서 {} 는 object객체

      // allEvents 초기화
      let allEvents = [{
        title: 'title1',
        start: '2023-04-05',
        end: '2023-04-10'
      }];

      //서버의 json 데이터를 가져오기 위한 fetch
      fetch('eventList.do')
        .then((resolve) => resolve.json()) // {}
        .then(function (result) {
          console.log(result);
          result.forEach(function (event) {
            let newEvent = {
              title: event.title,
              start: event.startDate,
              end: event.endDate
            }
            allEvents.push(newEvent);
          });//end of forEach
            //start
            var calendar = new FullCalendar.Calendar(calendarEl, {
              headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }, // fullcal을 그리기 위한 옵션들ㅇㅇ
              initialDate: new Date(), // 오늘날짜ㅇㅇ
              navLinks: true, // can click day/week names to navigate views
              selectable: true,
              selectMirror: true,
              select: function (arg) { // 이벤트등록할 때 실행되는 함수
                var title = prompt('이벤트등록:');
                if (title) {
                  console.log(title, arg.startStr, arg.endStr)
                  // Ajax호출
                  fetch('addEvent.do', {
                      method: "POST",
                      headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                      },
                      body: 'title='+title+'&startDate='+arg.startStr+'&endDate='+arg.endStr
                    })
                  .then(resolve => resolve.json())
                  .then(result => {
                      if (result.retCode == 'Success') {
                        // 화면에 추가된 이벤트 등록
                        calendar.addEvent({
                          title: title,
                          start: arg.start,
                          end: arg.end,
                          allDay: arg.allDay
                        })
                      } else {
                        alert('실패!');
                      }
                    })
                    .catch(err => console.log(err));
                }
                calendar.unselect()
              },
              eventClick: function (arg) {
                if (confirm('이벤트 삭제?')) {
                  //ajax호출
                  console.log(arg.event.title);
                  //arg.event.remove()
					fetch('removeEvent.do', {
						method : "GET",
						header : {
							'Content-Type': 'application/json',
						}
						
					})
					.then(resolve => resolve.json())
					.then(result => {
						if(result.retCode == 'Success'){
							calendar.removeEvent(arg.event.title)
             
						}else{
							alert('실패');
						}
					})
					.catch(err => console.log(err));
            }
                calendar.unselect()
              },
              editable: true,
              dayMaxEvents: true, // allow "more" link when too many events
              events: allEvents
            });
            calendar.render(); // 화면에그려짐ㅇㅇ
            //end
        }) // end of then
        .catch(function (err) {
          console.log(err);
        })
    });
  </script>
<style>
body {
	margin: 40px 10px;
	padding: 0;
	font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
	font-size: 14px;
}

#calendar {
	max-width: 1100px;
	margin: 0 auto;
}
</style>
</head>

<body>

	<div id='calendar'></div>

</body>

</html>