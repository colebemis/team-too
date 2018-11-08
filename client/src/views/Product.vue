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

        <Button v-if="product.stock > 0" @click.native="addToCart">
          Add to cart
        </Button>
        <span v-else class="text-red">Out of stock</span>
      </div>
    </div>
  </div>
</template>

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

      if (this.id in cart) {
        cart[this.id] += 1;
      } else {
        cart[this.id] = 1;
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      this.$router.push("/cart");
    },
  },
};
</script>
