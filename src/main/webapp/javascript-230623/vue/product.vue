<script>
  export default { // 뷰 인스턴스 생성
      data() { //
        return {
          //상품정보
          products: [],
          cart: []
        }
      },
      //== data : function() {}
      created() {
        console.log('create됨');
      },
      //== create : function(){}
      mounted() {
        console.log('mount됨');
        fetch('product.json')
          .then(result => result.json())
          .then(data => {
            //console.log(data)
            //this.products = data;
            data.forEach(data => {
              this.products.push(data);
            });
          })
          .catch(err => console.log(err))
      },
      updated() {
        console.log('update됨'); //이런데다가원하는기능넣어주면됨ㅇㅇ
      },
      methods: {
        //addCart : {}
        addCart(name) {
          this.cart.push(name);
        },

      }

    }
</script>



<template>
    <div v-for="product in products" class="card" style="width: 18rem;">
    <img v-bind:src="product.img" class="card-img-top" alt="...">
    <div class="card-body">
       <h5 v-text="product.name" class="card-title">Card title</h5>
       <p v-html="product.desc" class="card-text">Some quick example text to build on the card title and make up
          the bulk of the card's content.</p>
       <p v-text="product.price" class="card-text"></p>
       <a href="#" v-show="product.cnt>0" @click.prevent="addCart(product.name)" class="btn btn-primary">장바구니담기</a>
    </div>
  </div>
</template>