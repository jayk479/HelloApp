<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
<script type="text/javascript"
	src="https://www.gstatic.com/charts/loader.js"></script>
<script type="text/javascript">
	google.charts.load('current', {
		'packages' : [ 'corechart' ]
	});
	google.charts.setOnLoadCallback(drawChart);

	function drawChart() {

		//console.log('1')
		var result = [ [ 'dept', 'cnt' ] ];
		//console.log('2')
		let xhtp = new XMLHttpRequest(); // 비동기방식처리(Ajax호출) 서버에 데이터를 요청하기 위한 객체 선언 
		// 비동기방식이 효율적이라서 이렇게 처리함ㅇㅇ
		xhtp.open('get', 'chartData.do');
		xhtp.send(); // 요청
		xhtp.onload = function() { //요청 후 처리된 결과 불러오는 부분임ㅇㅇ
			//console.log('3') 
			let data = JSON.parse(xhtp.response); // {'admin' : 3, 'sales' : 5, ...'shipping' : 3}
			// data = {Admin : 3, Sales : 6, Shipping : 9, ...} //object타입
			for ( let dept in data) {
				console.log(dept, data[dept]); // 부서정보, 부서에담긴값
				result.push([ dept, data[dept] ]);
			}

			//console.log(result);
			//console.log('4')
			data = google.visualization.arrayToDataTable(result); //데이터테이블에배열형태로ㅇㅇ
			var options = {
				title : '부서별인원현황'
			};

			var chart = new google.visualization.PieChart(document
					.getElementById('piechart'));

			chart.draw(data, options); //chart가 그려지는 부분ㅇㅇ draw();
		}

	}
</script>
</head>

<body>
	<p>views/chart/pieChart.jsp</p>
	<div id="piechart" style="width: 900px; height: 500px;"></div>
</body>

</html>