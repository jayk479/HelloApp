
export let basket = {
	totalCount: 0,
	totalPrice: 0,
	delCheckedItem: function() {
		console.log('delCheckedItem');
		let check = document.querySelectorAll('.check>input');
		check.forEach(function(che) {
			if (che.checked) {
				//console.log(che.parentElement.parentElement.parentElement);
				che.parentElement.parentElement.parentElement.remove();
			}
		})
	},
	delAllItem: function() {
		console.log('delAllItem');
		let div = document.querySelectorAll('div.row.data')
		//console.log(div);
		div.forEach(function(i) {
			i.remove();
		})
	},
	reCalc: function() {
		console.log('reCalc');
		this.totalCount = 0;
		this.totalPrice = 0;

		let updown = document.querySelectorAll('.updown');
		let count = 0;
		updown.forEach(function(input) {
			let val = input.children[0].value;
			count += parseInt(val);
		})
		count = count - 2;
		this.totalCount = count;

		let sumPrice = document.querySelectorAll('.sum');
		//console.log(sumPrice);
		sumPrice.forEach(function(sum) {
			console.log(sum);
			//console.log(sum.text());
		})
		console.log(count);
	},
	updateUI: function() {
		console.log('updateUI');
		document.querySelector('#sum_p_num').textContent = '상품개수: ' + this.totalCount.formatNumber() + '개'
		document.querySelector('#sum_p_price').textContent = '합계금액: ' + this.totalPrice.formatNumber() + '원'
		console.log(this.totalCount);
	},

	changePNum: function(pos) {
		console.log("changePNum");
		//console.log(event);
		//console.log(document.querySelectorAll('.updown').children[0]);
		let cNum = $('#p_num' + (pos)).val();
		let price = $('#p_num' + (pos)).parent().parent().prev().children().eq(0).val();
		let count = $('#p_num' + (pos)).val();
		let eachPrice = parseInt(price) * parseInt(count);
		//input.val(parseInt(cNum)+1);
		if (event.target.tagName == 'INPUT') {
			//console.log('INPUT');
		} else if (event.target.tagName == 'I') {
			//console.log('icon클릭');
			if (event.target.classList.contains('up')) {
				//console.log('up');
				$('#p_num' + (pos)).val(parseInt(cNum) + 1);
				$('#p_num' + (pos)).parent().parent().next().text(eachPrice.formatNumber() + "원");
			} else if (event.target.classList.contains('down')) {
				//console.log('down');
				$('#p_num' + (pos)).val(parseInt(cNum) - 1);
				$('#p_num' + (pos)).parent().parent().next().text(eachPrice.formatNumber() + "원");
			}
		}

	},
	delItem: function() {
		console.log('delItem');
		let delBtn = document.querySelectorAll('.basketcmd a');
		delBtn.forEach(function(del) {
			del.addEventListener('click', function() {
				del.parentElement.parentElement.parentElement.remove();
				//console.log(del.parentElement.parentElement.parentElement);	
			})
		})
	},
	cartList: function() {
		cartItems.forEach((item, idx) => {
			let template = document.querySelector('#template>div.row.data').cloneNode(true);
			template.querySelector('.img>img').setAttribute('src', '../img/' + item.image)
			template.querySelector('.pname>span').textContent = item.productNm
			template.querySelector('.basketprice>input').value = item.price
			template.querySelector('.basketprice').childNodes[2].textContent = item.price.formatNumber() + "원"
			template.querySelector('.updown>input').value = item.qty
			template.querySelector('.updown>input').setAttribute('value', item.qty)
			template.querySelector('.updown>input').setAttribute('id', 'p_num' + (idx + 1));
			template.querySelector('.sum').textContent = (item.price * item.qty).formatNumber() + "원"
			document.querySelector('#basket').append(template)
		})
	}
};

var cartItems = [{
	no: 1,
	productNm: '이것이 민트다.',
	qty: 2,
	price: 12000,
	image: 'item1.PNG'
},
{
	no: 2,
	productNm: '와 아이스크림.',
	qty: 1,
	price: 22000,
	image: 'item2.PNG'
},
{
	no: 3,
	productNm: '모나카 케익.',
	qty: 1,
	price: 13600,
	image: 'item3.PNG'
}
]

// 숫자 3자리 콤마찍기
Number.prototype.formatNumber = function() {
	if (this == 0) return 0;
	let regex = /(^[+-]?\d+)(\d{3})/;
	let nstr = (this + '');
	while (regex.test(nstr)) nstr = nstr.replace(regex, '$1' + ',' + '$2');
	return nstr;
};