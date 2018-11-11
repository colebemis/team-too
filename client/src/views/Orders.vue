<template>
  <div>
    <PageHeader>Orders</PageHeader>

    <table>
      <tr>
        <th>Order</th>
        <th>Status</th>
        <th>Type</th>
        <th>Date</th>
        <th>Customer</th>
      </tr>

      <tr v-for="order in orders" :key="order.id">
        <td>
          <router-link :to="{ path: `/admin/order/${order.id}` }">
            {{ order.id }}
          </router-link>
        </td>
        <td>{{ order.status }}</td>
        <td>{{ order.status }}</td>
        <td>{{ order.createdAt }}</td>
        <td>{{ order.customer.name }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import gql from "graphql-tag";
import PageHeader from "@/components/PageHeader.vue";

export default {
  components: { PageHeader },
  data() {
    return {
      orders: [],
    };
  },
  apollo: {
    orders: gql`
      query orders {
        orders {
          id,
          status,
          createdAt,
          customer{name}
        }
      }
    `,
  },
};
</script>

<style scoped>
.gridHeader {
  display: grid;
  padding: 10px;
  grid-template-columns: repeat(10, 1fr);
  font-weight: bold;
}

.gridHeader > div:nth-child(2) {
  grid-column: 7;
}

.gridHeader > div:nth-child(3) {
  grid-column: 10;
}
</style>
