<template>
  <div>
    <h1>Inventory</h1>
    <div v-for="product in products" :key="product.id">
      <router-link :to="{ path: `/admin/product/${product.id}` }">
        {{ product.title }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import gql from "graphql-tag";

export default Vue.extend({
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
});
</script>
