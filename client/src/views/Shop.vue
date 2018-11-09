<template>
  <div class="container mx-auto my-12 px-4">
    <div class="grid">
      <router-link
        class="block text-center hover:opacity-75"
        v-for="product in products"
        :key="product.id"
        :to="`/product/${product.id}`"
      >
        <div class="flex flex-col">
          <div
            class="bg-image relative"
            :style="`background-image: url(${product.imageURL});`"
          >
            <div
              v-if="product.stock == 0"
              class="absolute pin bg-white opacity-75"
            />
            <div
              v-if="product.stock == 0"
              class="absolute pin flex items-center justify-center"
            >
              <span
                class="bg-black text-white text-sm tracking-wide font-semibold py-2 px-3 uppercase"
              >
                Out of stock
              </span>
            </div>
          </div>
          <span class="mt-4 text-black font-semibold leading-normal">
            {{ product.title }}
          </span>
          <span class="text-grey-darkest leading-normal">
            ${{ product.price.toFixed(2) }}
          </span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  data() {
    return {
      products: [],
    };
  },
  apollo: {
    products: gql`
      query products {
        products {
          id
          description
          title
          price
          imageURL
          stock
        }
      }
    `,
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  column-gap: 24px;
  row-gap: 48px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.bg-image {
  padding-bottom: 67%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
