<template>
  <div>
    <PageHeader>Cart</PageHeader>
    <div class="mt-10 mb-20">
      <div v-if="$apollo.loading" class="my-20 text-center"><Loader /></div>

      <div v-else>
        <div v-if="this.products.length === 0" class="container mx-auto mt-5 mb-10 text-center">
          Your cart is empty. Check out the shop to add items to your cart!
        </div>

        <div v-else class="container mx-auto mb-10">
          <div
            class="gridHeader bg-grey-darkest text-white border border-solid border-grey-dark"
          >
            <div class="">PRODUCT</div>
            <div class="text-center">QUANTITY</div>
            <div class="text-right">PRICE</div>
          </div>

          <div
            class="flex mt-10 text-center"
            :key="product.id"
            v-for="product in products"
            v-if="cart[product.id] > 0"
          >
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
            <div
              class="bg-grey-lighter flex items-center justify-center w-1/3 mt-10"
            >
              <!-- Quantity -->
              <div class="w-1/3 h-12 pt-4">{{ cart[product.id] }}</div>

              <!-- Maximum Stock Warning -->
              <div
                v-if="cart[product.id] === product.stock"
                class="bg-red-lightest border border-red-light text-red-dark px-4 py-3 mr-5 text-xs rounded relative"
                role="alert"
              >
                <span class="block xs:inline">Maximum product stock reached.</span>
              </div>

              <!-- +/- Buttons -->
              <div class="w-1/3 h-12">
                <div :id="product.id" class="inline-flex mt-2">
                  <button
                    @click="incrementQuantity(product.id, product.stock);"
                    :id="product.stock"
                    class="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded-l"
                  >
                    +
                  </button>
                  <button
                    @click="decrementQuantity(product.id);"
                    class="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded-r"
                  >
                    -
                  </button>
                </div>
              </div>

              <div :id="product.id" class="w-1/3 h-12">
                <button
                  @click="removeItem(product.id);"
                  :id="product.id"
                  class="bg-grey-dark hover:bg-grey text-grey-lightest font-bold mt-2 py-2 px-4 rounded-full"
                >
                  x
                </button>
              </div>
            </div>

            <!-- Product Price -->
            <div class="bg-grey flex items-center justify-end w-1/3 mt-10 pr-5">
              {{ cart[product.id] }} at ${{ product.price.toFixed(2) }} each = &#32;
              <span class="ml-2 font-semibold">
                &#32; ${{ (product.price * cart[product.id]).toFixed(2) }}
              </span>
            </div>
          </div>

          <!-- Subtotal -->
          <div class="flex items-center justify-center mt-10">
            <div class="w-1/3 h-12"></div>
            <div
              class="w-1/3 text-center bg-grey border border-solid border-grey-dark h-12 pt-3"
            >
              SUBTOTAL
            </div>
            <div
              class="w-1/3 bg-grey-light text-center border border-solid border-grey-dark h-12 pt-3"
            >
              $ {{ subtotal.toFixed(2) }}
            </div>
          </div>

          <!-- Tax -->
          <div class="flex items-center justify-center">
            <div class="w-1/3 h-12"></div>
            <div
              class="w-1/3 bg-grey border border-solid border-grey-dark text-center h-12 pt-3"
            >
              TAX
            </div>
            <div
              class="w-1/3 bg-grey-light text-center border border-solid border-grey-dark h-12 pt-3"
            >
              $ {{ (subtotal * 0.0725).toFixed(2) }}
            </div>
          </div>

          <!-- Total Price -->
          <div class="flex mt-5 items-center justify-center">
            <div
              class="w-1/3 bg-grey-darkest text-white font-bold text-center h-12 pt-3"
            >
            </div>
          
            <div
              class="w-1/3 bg-grey-darkest text-white font-bold text-center h-12 pt-3"
            >
              TOTAL
            </div>

            <div
              class="w-1/3 bg-grey-darkest text-white font-bold text-center h-12 pt-3"
            >
              $ {{ (subtotal * 0.0725 + subtotal).toFixed(2) }}
            </div>
          </div>

          <!-- Checkout Button -->
          <div class="flex mt-5 items-center justify-center">
            <div
              class="w-1/3 text-white font-bold text-center h-12 pt-3"
            >
            </div>
          
            <div
              class="w-1/3 text-white font-bold text-center h-12 pt-3"
            >
            </div>

            <div
              class="w-1/3 text-white font-bold text-center h-12 pt-3"
            >
                <Button
                v-on:click="checkout"
                class="bg-grey-light hover:bg-grey text-grey-darkest font-bold text-right content-right py-5 px-5 mb-7 rounded-l rounded-r"
                >
                    PROCEED TO CHECKOUT
                </Button>
            </div>
          </div>

        </div>
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

<script lang="ts">
import Vue from "vue";
import gql from "graphql-tag";
import PageHeader from "@/components/PageHeader.vue";
import Footer from "@/components/Footer.vue";
import Loader from "@/components/Loader.vue";

export default Vue.extend({
  components: { PageHeader, Footer, Loader },
  data() {
    return {
      cart: JSON.parse(localStorage.getItem("cart") || "{}"),
      products: [],
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
          ids: Object.keys(this.cart).map(id => ({ id })),
        },
      };
    },
  },
  computed: {
    subtotal(): number {
      return this.products.reduce(
        (subtotal, currentProduct: { id: string; price: number }) =>
          subtotal + currentProduct.price * this.cart[currentProduct.id],
        0,
      );
    },
  },
  methods: {
    clearCart() {
      this.cart = {};
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },

    checkout(){
      this.$router.push("/checkout");
    },

    incrementQuantity(productID: string, productStock: number) {
      // Modify the local instance of the cart to update the front-end values
      if (this.cart[productID] + 1 > productStock) {
        // out of stock
      } else {
        this.cart[productID] += 1;
      }

      // Update the actual cart in local storage
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },

    decrementQuantity(productID: string) {
      // Modify the local instance of the cart to update the front-end values
      let remove = false;

      if (this.cart[productID] === 1) {
        remove = window.confirm(
          "Are you sure you want to remove this item from your cart?",
        );

        if (remove) {
          delete this.cart[productID];

          const index = this.products.findIndex((p: { id: string }) => (p.id === productID));
          this.products.splice(index, 1);

          localStorage.setItem("cart", JSON.stringify(this.cart));
        }

      } else {
        this.cart[productID] -= 1;
      }

      localStorage.setItem("cart", JSON.stringify(this.cart));
    },

    removeItem(productID: string) {
      const remove = window.confirm(
        "Are you sure you want to remove this item from your cart?",
      );

      if (remove) {
        delete this.cart[productID];

        const index = this.products.findIndex((p: { id: string }) => (p.id === productID));
        this.products.splice(index, 1);

        localStorage.setItem("cart", JSON.stringify(this.cart));
      }
    },
  },
});
</script>
