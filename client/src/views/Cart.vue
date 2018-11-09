<template>
  <div class="about mb-20">
    <div class="pageHead">
      <span> Cart </span>
      <hr />
    </div>

    <div class="container mx-auto mb-10">
      <div class="gridHeader bg-grey-darkest text-white border border-solid border-grey-dark">
        <div>PRODUCT</div>
        <div>QUANTITY</div>
        <div>PRICE</div>
      </div>

      <div class="gridRow" :key="product.id" v-for="product in products">

        <!-- Product image and title - 2 columns -->
        <div class="flex mb-4">
          <div class="w-1/2 h-12">
              <div class="bg-image relative border border-solid border-grey-dark" :style="`background-image: url(${product.imageURL});`">   

              </div>
          </div>

          <div class="w-1/2 text-left bg-grey font-semibold ml-5 h-12">
              <div class = "mt-3">   {{ product.title }} </div>
          </div>
        </div>

        <div class = "bg-grey-darker">   {{ cart[product.id] }} </div>
        <div class = "bg-grey-darkest"> $ {{ product.price }} </div>
      </div>
    </div>
    
  </div>
</template>

<style>
.pageHead {
  text-align: center;
  font-size: 20pt;
  font-weight: bolder;
}

.gridHeader {
  display: grid;
  padding: 10px;
  grid-template-columns: repeat(3, 1fr);
  font-weight: bold;
}

.bg-image {
  padding-bottom: 67%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.gridRow {
  display: grid;
  padding: 50px;
  grid-template-columns: repeat(3, 1fr);
  font-weight: regular;
}

.gridHeader > div:nth-child(1) {
  grid-column: 1;
}

.gridHeader > div:nth-child(2) {
  grid-column: 2;
}

.gridHeader > div:nth-child(3) {
  grid-column: 3;
}

hr {
  opacity: 0.5;
  margin-top: 10px;
  margin-bottom: 30px;
}

.body {
  font-family: "Work sans", "Avenir", Helvetica, Arial, sans-serif;
  width: 80%;
  margin: auto;
  border: 1px solid grey;
}
</style>

<script>
import gql from "graphql-tag";

export default {
  data() {
    return {
      cart: JSON.parse(localStorage.getItem("cart") || "{}"),
      products: []
    };
  },
    apollo: {
    products() {
      return {
        query: gql`
          query cartProducts($ids: [ProductWhereInput!]) {
            products(where: { OR: $ids }) {
              id
              title
              imageURL
              description
              price
              stock
            }
          }
        `,
        variables: { 
            ids: Object.keys(this.cart).map(id => ({id}))
        },
      };
    },
  },
};
</script>
