vue<template>
  <div class="about mt-10 mb-20">
    <div class="pageHead">
      <span> YOUR SHOPPING CART </span>
      <hr />
    </div>

    <div class="container mx-auto mb-10">
      <div class="gridHeader bg-grey-darkest text-white border border-solid border-grey-dark">
        <div class = "">PRODUCT</div>
        <div class = "text-center">QUANTITY</div>
        <div class = "text-right">PRICE</div>
      </div>

      <div class="flex mt-10 text-center" :key="product.id" v-for="product in products" :to="`../product/${product.id}`">

        <!-- Product Info: image and title - 2 columns -->
        <router-link
          class="flex items-center w-1/3 mt-10 align-left hover:opacity-75"
          :to="`/product/${product.id}`"
        >
            <!-- Image -->
            <div class="w-1/2 h-12">
                <div class="items-center relative">
                  <img width="70%" :src="product.imageURL" :alt="product.title" />
                </div>
            </div>

            <!-- Title -->
            <div class="items-center w-1/2 text-left font-semibold mt-10 h-12">
                {{ product.title }}
            </div>

        </router-link>

        <!-- Product Quantity -->
        <div class="bg-grey-lighter flex items-center justify-center w-1/3 mt-10">
          <div class="w-1/2 h-12 pt-3">
              {{ cart[product.id] }}
          </div>
          
          <!-- +/- Buttons -->
          <div class="w-1/2 h-12">
              <div :id="product.id" class="inline-flex">
                <button v-on:click="incrementQuantity" class="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded-l">
                  +
                </button>
                <button v-on:click="decrementQuantity" class="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded-r">
                  -
                </button>
              </div>
          </div>
        </div>

        <!-- Product Price -->
        <div class = "bg-grey flex items-center justify-end w-1/3 mt-10 pr-5"> {{ cart[product.id] }} at ${{ product.price.toFixed(2) }} each = &#32;
            <span class = "ml-2 font-semibold"> &#32; ${{ (product.price * cart[product.id]).toFixed(2) }}  </span>
        </div>

      </div>

      <!-- Subtotal -->
      <div class="flex items-center justify-center mt-10">
        <div class="w-1/3 h-12"></div>
        <div class="w-1/3 text-center bg-grey border border-solid border-grey-dark h-12 pt-3"> SUBTOTAL </div>
        <div class="w-1/3 bg-grey-light text-center border border-solid border-grey-dark h-12 pt-3"> $ {{ subtotal.toFixed(2) }} </div>
      </div>

      <!-- Tax -->
      <div class="flex items-center justify-center">
        <div class="w-1/3 h-12"></div>
        <div class="w-1/3 bg-grey border border-solid border-grey-dark text-center h-12 pt-3"> TAX </div>
        <div class="w-1/3 bg-grey-light text-center border border-solid border-grey-dark h-12 pt-3"> $ {{ (subtotal * 0.0725).toFixed(2) }} </div>
      </div>

    <!-- Total Price -->
      <div class="flex mt-5 items-center justify-center">
        <div class="w-1/3 h-12"></div>
        <div class="w-1/3 bg-grey-darkest text-white font-bold text-center h-12 pt-3"> TOTAL </div>
        <div class="w-1/3 bg-grey-darkest text-white font-bold text-center h-12 pt-3"> $ {{ (subtotal * 0.0725 + subtotal).toFixed(2) }} </div>
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

  computed: {
    subtotal() { 
      return this.products.reduce(((subtotal, currentProduct) => subtotal + currentProduct.price * this.cart[currentProduct.id]), 0)
    }
  },

    // define methods under the `methods` object
  methods: {
    incrementQuantity: function (event) {

      console.log(event.currentTarget.parentNode.id);
      console.log('click')

      //const cart = JSON.parse(localStorage.getItem("cart") || "{}");
      this.cart[event.currentTarget.parentNode.id] += 1;
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },

    decrementQuantity: function (event) {

      console.log(event.currentTarget.parentNode.id);
      console.log('click')

      //const cart = JSON.parse(localStorage.getItem("cart") || "{}");
      this.cart[event.currentTarget.parentNode.id] -= 1;
      localStorage.setItem("cart", JSON.stringify(this.cart));
    }
  }
};

</script>
