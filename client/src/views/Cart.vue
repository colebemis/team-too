<template>
  <div class="about">
    <div class="pageHead">
      <span> Cart </span>
      <hr />
    </div>

    <div class="container mx-auto">
      <div class="gridHeader border border-solid border-grey-dark">
        <div>PRODUCT</div>
        <div>QUANTITY</div>
        <div>PRICE</div>
      </div>

      <div class="gridRow" :key="product.id" v-for="product in products">
        <div>   {{ product.title }} </div>
        <div>   {{ cart[product.id] }} </div>
        <div> $ {{ product.price }} </div>
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

.gridRow {
  display: grid;
  padding: 10px;
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
