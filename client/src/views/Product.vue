<template>
  <div v-if="product">
    <div>{{ product.title }}</div>
  </div>
</template>

<script lang="ts">
import gql from "graphql-tag";

export default {
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
        variables: { id: this.$route.params.id },
      };
    },
  },
};
</script>
