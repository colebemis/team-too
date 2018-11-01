<template>
  <div class="about">
    
      <!-- Apollo watched Graphql query -->
    <ApolloQuery
      :query="require('../graphql/ShopProduct.gql')"
    >
      <template slot-scope="{ result: { loading, error, data } }">
        <!-- Result -->
        <div class = "images">
        <div v-bind:id="product.id" v-for="product of data.products" :key="product.title" class="product" v-on:click="routeToProduct">
          <img v-bind:src="product.imageURL" class="productImg">
          <div  class="imageInfo">
            
            <p>${{product.price}}</p>
            <p>{{product.title}}</p>
          </div>
        </div>
        </div>
      </template>
    </ApolloQuery>
    
  </div>
</template>

<style>
  img {
    width: 90%;
    height:175px;
    margin: 2%;
    object-fit: scale-down;
    
  }
  div.product {
    border: 5px solid #f1f1f1;
    margin: 1.66%;
    height: auto;

  }
  div.imageInfo {
    text-align: center;
    font-family: "PT Sans";
    line-height:0.5;
    padding-bottom: 20px;

  }

  div.images {
    border: 3px solid gray;
    float: right;
    
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    width: 80%;
    margin-right: 30px;
  }
</style>
<script>
export default {
  name: 'shop',

  methods: {
    routeToProduct(event) {
      var idd = event.currentTarget.id;
      console.log(event.target);
      this.$router.push({path: '/productInfo', query: {productId: idd}})
    }
  }
}
</script>




