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
          <div class="container mx-auto mb-10">
            <div
              class="flex pt-3 pb-3 font-bold text-grey-darkest border border-solid border-grey-dark"
            >
              <div class="flex w-2/5 items-center pl-5 align-left">PRODUCT</div>
              <div class="flex w-1/5 items-center justify-center">PRICE</div>
              <div class="flex w-2/5 items-center justify-center">QUANTITY</div>
              <div class="flex pr-5 w-1/5 items-end justify-end">TOTAL</div>
            </div>

            <div
              class="flex mt-5 text-center border border-solid border-grey-light "
              :key="product.id"
              v-for="product in products"
              v-if="cart[product.id] > 0"
            >
              <!-- Product Info: image and title - 2 columns -->
              <router-link
                class="flex w-2/5 items-center align-left hover:opacity-75"
                :to="`/product/${product.id}`"
              >
                <!-- Image -->
                <div class="w-1/2">
                  <div class="flex self-start flex-wrap relative p-4">
                    <div class="w-full bg-image" :style="`background-image: url(${product.imageURL});`" />
                  </div>
                </div>

                <!-- Title -->
                <div class="items-center w-1/2 text-left font-semibold mt-10 h-12">
                  {{ product.title }}
                </div>
              </router-link>

              <!-- Product Single Price -->
              <div class="flex w-1/5  bg-grey-lighter items-center justify-center">
                ${{ (product.price.toFixed(2)) }}
              </div>

              <!-- Product Quantity -->
              <div
                class="flex w-2/5 bg-grey-lightest items-center justify-center"
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
                    class="bg-grey-light hover:bg-grey text-grey-darkest font-bold mt-3 py-1 px-2 rounded-full"
                  >
                    x
                  </button>
                </div>
              </div>

              <!-- Product Price -->
              <div class="flex pr-5 w-1/5 bg-grey-light items-center justify-end">
                <span class="ml-2 font-semibold">
                  &#32; ${{ (product.price * cart[product.id]).toFixed(2) }}
                </span>
              </div>
            </div>


            <!-- Subtotal -->
            <div class="flex items-center justify-center mt-10">
              <div class="w-1/3 h-12"></div>
              <div
                class="w-1/3 text-center bg-grey-lightest border border-solid border-grey-dark h-12 pt-3"
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
                class="w-1/3 bg-grey-lightest border border-solid border-grey-dark text-center h-12 pt-3"
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
            <div class="flex items-center justify-center">
              <div class="w-1/3 h-12"></div>
              <div
                class="w-1/3 bg-grey-lightest font-semibold border border-solid border-grey-dark text-center h-12 pt-3"
              >
                TOTAL
              </div>
              <div
                class="w-1/3 bg-grey-light font-semibold text-center border border-solid border-grey-dark h-12 pt-3"
              >
                $ {{ (subtotal * 0.0725 + subtotal).toFixed(2) }}
              </div>
            </div>

            <!-- Checkout Button -->
            <div class="flex mt-5 items-center justify-end">
              <Button @click="checkout">Proceed to Checkout</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

.divbutton {
    height: 30px;
    background: #000;
}

.divbutton:hover button {
    display: block;
}

.pageHead {
  text-align: center;
  font-size: 20pt;
  font-weight: bolder;
}

.gridHeader {
  display: grid;
  padding: 10px;
  grid-template-columns: repeat(4, 1fr);
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
  grid-template-columns: repeat(4, 1fr);
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
import Button from "@/components/Button.vue";

export default Vue.extend({
  components: { PageHeader, Footer, Loader, Button },
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
