<template>
    <div>
      <div v-if="$apollo.loading" class="my-20 text-center"><Loader /></div>
      <div v-else class="container mx-auto my-12 px-4">
        <div v-if="product" class="flex flex-col lg:flex-row items-start">
          <div class="w-full lg:w-3/5">
            <img width="100%" :src="product.imageURL" :alt="product.title" />
          </div>
          <div
            class="border p-6 w-full lg:w-2/5  mt-8 lg:mt-0 ml-0 lg:ml-8 flex flex-col"
          >
            <h1 class="text-3xl font-semibold leading-none text-black">
              {{ product.title }}
            </h1>
            <span class="mt-1 text-xl leading-normal text-grey-darker">
              ${{ product.price.toFixed(2) }}
            </span>
            <p class="mt-4 mb-10 leading-normal text-gray-darker">
              {{ product.description }}
            </p>

            <!-- Add to Cart -->
            <span>
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="quantity"
              >
                Select a Quantity
              </label>
              <label
                class="block uppercase tracking-wide text-grey text-xs font-bold mb-2"
                for="quantity"
              >
                {{ product.stock }} currently in stock
              </label>

              <div class="flex mb-4" v-if="product.stock > 0">
                <div class="flex w-1/2 h-12 pr-4">
                  <div class="w-1/3 h-12 pt-4 pl-4">{{ quantityToAddToCart }}</div>

                  <div class="w-1/3 h-12">
                    <div :id="product.id" class="inline-flex mt-2">
                      <button
                        v-on:click="incrementQuantity(product.stock);"
                        class="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded-l"
                      >
                        +
                      </button>
                      <button
                        v-on:click="decrementQuantity"
                        class="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded-r"
                      >
                        -
                      </button>
                    </div>
                  </div>

                  <div class="w-1/3 h-12"></div>
                </div>

                <div class="w-1/2 h-12">
                  <Button @click.native="addToCart(product.stock);">
                    Add to cart
                  </Button>
                </div>
              </div>

              <button v-else class="cursor-not-allowed bg-red">Out of stock</button>
            </span>

            <!-- Maximum Stock Warning -->
            <div
              v-if="userAttemptedToAddTooMany"
              class="mt-5 bg-red-lightest border border-red-light text-red-dark px-4 py-3 mr-5 text-sm rounded relative"
              role="alert"
            >
              <span class="block xs:inline"
                >You cannot add any more - Maximum product stock reached including
                items in cart.</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<style>
input:invalid {
  border: 1px dashed red;
}

input:valid {
  border: 1px solid #f1f5f8;
}
</style>

<script lang="ts">
import Vue from "vue";
import gql from "graphql-tag";
import Button from "@/components/Button.vue";
import Loader from "@/components/Loader.vue";

export default Vue.extend({
  components: { Button, Loader },
  props: { id: String },
  data() {
    return {
      product: null,
      quantityToAddToCart: 1,
      userAttemptedToAddTooMany: false,
    };
  },
  apollo: {
    product() {
      return {
        query: gql`
          query product($id: ID!) {
            product(where: { id: $id }) {
              id
              title
              imageURL
              description
              price
              stock
            }
          }
        `,
        variables: { id: this.id },
      };
    },
  },
  methods: {
    incrementQuantity(stock: number) {
      const cart = JSON.parse(localStorage.getItem("cart") || "{}");

      if (this.id in cart) {
        if (cart[this.id] + this.quantityToAddToCart + 1 <= stock) {
          this.quantityToAddToCart += 1;
          this.userAttemptedToAddTooMany = false;
        } else {
          this.userAttemptedToAddTooMany = true;
        }
      } else {
        if (this.quantityToAddToCart + 1 <= stock) {
          this.quantityToAddToCart += 1;
          this.userAttemptedToAddTooMany = false;
        } else {
          this.userAttemptedToAddTooMany = true;
        }
      }
    },

    decrementQuantity(event: Event) {
      if (this.quantityToAddToCart > 1) {
        this.quantityToAddToCart -= 1;
        this.userAttemptedToAddTooMany = false;
      }
    },

    addToCart(stock: number) {
      const cart = JSON.parse(localStorage.getItem("cart") || "{}");
      const quantity = this.quantityToAddToCart;

      if (this.id in cart) {
        if (cart[this.id] + quantity > stock) {
          alert("You cannot add more than the current stock available.");
        } else {
          cart[this.id] += quantity;
          localStorage.setItem("cart", JSON.stringify(cart));
          this.$router.push("/cart");
        }
      } else {
        if (quantity > stock) {
          alert("You cannot add more than the current stock available.");
        } else {
          cart[this.id] = quantity;
          localStorage.setItem("cart", JSON.stringify(cart));
          this.$router.push("/cart");
        }
      }
    },
  },
});
</script>
