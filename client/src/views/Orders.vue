<template>
  <div>
    <PageHeader>Orders</PageHeader>
    <table class="table-auto w-full">
      <tr class="bg-grey-light pb-8">
        <th>Order ID</th>
        <th>Status</th>
        <th>Type</th>
        <th>Date</th>
        <th>Customer</th>
      </tr>

      <tr v-for="order in orders" :key="order.id" class="hover:bg-grey-lighter mt-10 text-center">
        <td>
          <router-link :to="{ path: `/admin/order/${order.id}` }">
            {{ order.id }}
          </router-link>
        </td>
        <td>{{ order.status }}</td>
        <td>{{ (order.shippingAddress == null ? "In-Store" : "Delivery") }}</td>
        <td>{{ formatDate(order.createdAt, "MM/DD/YYYY hh:mm A") }}</td>
        <td>{{ order.customer.name }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import format from 'date-fns/format';
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
          customer{name},
          shippingAddress{id}
        }
      }
    `,
  },
  methods: {
    formatDate:format
  }
};
</script>

<style scoped>


</style>
