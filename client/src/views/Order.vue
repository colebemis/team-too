<template>
  <div v-if="order">
    <div>{{ order.id }}</div>
  </div>
</template>

<script lang="ts">
import gql from "graphql-tag";

export default {
  data() {
    return {
      order: null,
    };
  },
  apollo: {
    order() {
      return {
        query: gql`
          query order($id: ID!) {
            order(where: { id: $id }) {
              id
            }
          }
        `,
        variables: { id: this.$route.params.id },
      };
    },
  },
};
</script>
