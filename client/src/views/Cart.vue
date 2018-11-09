<template>
  <div>
    <PageHeader>Cart</PageHeader>
    <div class="container mx-auto">
      <div class="gridHeader border border-solid border-grey-dark">
        <div>PRODUCT</div>
        <div>QUANTITY</div>
        <div>TOTAL</div>
      </div>
    </div>

    <div class="products" :key="product.id" v-for="product in cart">
      <div>{{ product.id }}</div>
      <div>{{ product.quantity }}</div>
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
  grid-template-columns: repeat(10, 1fr);
  font-weight: bold;
}

/* .products {
    display: grid;
    grid-template-columns: repeat(10, 1fr)
} */

.gridHeader > div:nth-child(2) {
  grid-column: 7;
}

.gridHeader > div:nth-child(3) {
  grid-column: 10;
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
import PageHeader from "@/components/PageHeader.vue";

export default {
  components: { PageHeader },
  data() {
    const cart = JSON.parse(localStorage.getItem("cart") || "{}");
    return {
      cart: Object.entries(cart).map(entry => ({
        id: entry[0],
        quantity: entry[1],
      })),
    };
  },
};
</script>
