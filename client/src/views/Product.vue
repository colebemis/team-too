<template>
  <div class="container mx-auto my-12 px-4">
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
          <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="quantity">
            {{ product.stock }} currently in stock
          </label>

          <div class="flex mb-4" v-if="product.stock > 0">
            <div class="w-1/2 h-12">
              <input id="quantity" pattern="\d{1,5}" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white " type="text" placeholder="Enter Quantity">
            </div>

            <div class="w-1/2 h-12">
              <Button @click.native="addToCart">
                Add to cart
              </Button>
            </div>
          </div>

          <Button v-else class = "cursor-not-allowed bg-red">
            Out of stock
          </Button>

        </span>
        
      </div>
    </div>
  </div>
</template>

<style>

input:invalid {
  border: 1px dashed red;
}

input:invalid {
  border: 1px grey;
}

</style>

<script lang="ts">
import gql from "graphql-tag";
import Button from "@/components/Button.vue";

export default {
  components: { Button },
  props: { id: String },
  data() {
    return {
      product: null,
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
    addToCart() {
      const cart = JSON.parse(localStorage.getItem("cart") || "{}");

      const inputValue = (document.getElementById("quantity") as HTMLInputElement).value;
      const quantity = Number(inputValue);

      if(isNaN(quantity) || quantity < 0){
        
          alert("Please enter a valid quantity.");

      } else {

        if (this.id in cart) {

          if(cart[this.id] + quantity > this.product.stock){
            alert("You cannot add more than the current stock available.");
          } else {
            cart[this.id] += quantity;
            localStorage.setItem("cart", JSON.stringify(cart));
            this.$router.push("/cart");
          }

        } else {

          if(quantity > this.product.stock){
            alert("You cannot add more than the current stock available.");
          } else {
            cart[this.id] = quantity;
            localStorage.setItem("cart", JSON.stringify(cart));
            this.$router.push("/cart");
          }

        }
      }
    },
  },
};
</script>
