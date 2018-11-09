<template>
  <div>
    <h1>Orders</h1>
    <div v-for="order in orders" :key="order.id">
      <router-link :to="{ path: `/admin/order/${order.id}` }">
        {{ order.id }}
      </router-link>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  data() {
    return {
      orders: [],
    };
  },
  apollo: {
    orders: gql`
      query orders {
        orders {
          id
        }
      }
    `,
  },
};
</script>
