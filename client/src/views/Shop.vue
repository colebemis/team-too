<template>
  <div class="about">
    
      <!-- Apollo watched Graphql query -->
     <!-- <div class="categories">
      <h3> Categories </h3>
      <ApolloQuery
      :query="require('../graphql/Categories.gql')"
    >
      <template slot-scope="{ result: { loading, error, data } }">
        <div :key="category.name" v-for="category of data.categories">
        <input type="checkbox" :id="category.name" :value="category.name" v-model="categories">
        <label :for="category.name">{{category.name}}</label>
        </div>
        <p>{{categories}}</p>

      </template>
      </ApolloQuery>
    </div>  -->

    
    <ApolloQuery
      :query="require('../graphql/ShopProduct.gql')"
    >
      <template slot-scope="{ result: { loading, error, data } }">
        <!-- Result -->
        <div class = "images">
        <div :id="product.id" v-for="product of data.products" :key="product.title" class="product" v-on:click="routeToProduct">
            <div class="out-of-stock" v-if="product.stock === 0">
              <h2>Out of Stock</h2>
            </div>

            <img v-bind:src="product.imageURL" class="productImg">
            <div  class="imageInfo">
              
              <p>${{product.price.toFixed(2)}}</p>
              <p>{{product.title}}</p>



            </div>


        </div>
        </div>
      </template>
    </ApolloQuery>
    
  </div>
</template>

<style>
  img.productImg {
    width: 90%;
    height:175px;
    margin: 2%;
    object-fit: scale-down;
  }


  div.product {

    margin: 1.66%;
    height: auto;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.12),
            0 2px 4px 0 rgba(0,0,0,0.08);
    position: relative;

  }

  .out-of-stock {
    padding: 10px;
    position: absolute;
    top: 45%;;
    left: 36%;
    background: red;
    border-radius: 3px;
    color: white;
    z-index: 1000;
    
  }
/* 
  .out-of-stock:hover {
    cursor: not-allowed;
  } */

  div.parent-out-of-stock {
     margin: 1.66%;
    position: relative;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.12),
            0 2px 4px 0 rgba(0,0,0,0.08); 
    opacity: 0.5;
  }

  div.parent-out-of-stock:hover {
    cursor: not-allowed;
  }
  div.product:hover {
      cursor: pointer;

      box-shadow: 0 4px 8px 0 #337ab7,
                  0 2px 4px 0 #337ab5,
                  0 -2px 8px 0 #337ab5;
      
  }
  div.imageInfo {
    text-align: center;
    font-family: "PT Sans";
    line-height:0.5;
    padding-bottom: 20px;

  }
  div.categories {
    width: 15%;
  
    float: left;
    border: 1px solid blue;
    display: grid;
    margin-left: 30px;
    grid-template-columns: 100%;
  }
  div.images {
    /* border: 3px solid gray; */
    float: right;
    display: grid;
    grid-template-columns: 33% 33% 33%;
    width: 80%;
    margin-right: 30px;
  }
</style>

<script>

export default {
  name: 'shop',
  data: function() {
    return {
      categories: []
       
    }

  },
  methods: {
    routeToProduct(event) {
      var idd = event.currentTarget.id;
      console.log(event.target);
      this.$router.push({path: '/productInfo', query: {productId: idd}})
    },
    makeOutStock(event) {
      console.log("aSdasd");
    }
  }

}

setTimeout(function() {
  var out = document.querySelectorAll(".out-of-stock");
  // out.forEach(function() {
  //   console.log(this);
  //   // this.parentNode.classList.toggle(".parent-out-of-stock")
  // })
  for (var i = 0; i < out.length; i++) {
    // out[i].nextSibling.classList.toggle("parent-out-of-stock");
    out[i].parentNode.classList.toggle("parent-out-of-stock");
    out[i].parentNode.classList.remove("product");
  }
}, 500);

</script>




