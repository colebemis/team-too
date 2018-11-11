<template>
  <div>
    <PageHeader>Orders</PageHeader>

     <div class="md:w-1/5 mb-4 md:mb-0">
        <h2 class="mb-5 uppercase text-sm tracking-wide text-black">
          Order Status
        </h2>
        <div class="my-4" :key="status" v-for="status in statuses">
          <input
            type="checkbox"
            class="checkbox hidden"
            :id="status"
            :value="status"
            v-model="selectedStatuses"
          />
          <label :for="status" class="relative">
            <span class="ml-2 leading-none">{{status}}</span>
          </label>
        </div>
      </div>

    <table class="table-auto w-full">
      <tr class="bg-grey-light pb-8">
        <th>Order ID</th>
        <th>Status</th>
        <th>Type</th>
        <th>Date</th>
        <th>Customer</th>
      </tr>

      <tr v-for="order in filteredOrders" :key="order.id" class="hover:bg-grey-lighter mt-10 text-center">
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
      statuses: ["RECEIVED", "PROCESSING", "READY_TO_SHIP","COMPLETE","CANCELLED","PENDING", "pending"],
      selectedStatuses: []
    };
  },
  computed: {
    filteredOrders() {
      if (this.selectedStatuses.length == 0) {
        return this.orders;
      }

      return this.orders.filter(order =>
        this.selectedStatuses.includes(order.status),
      );
    },
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


.checkbox + label::before {
  content: "";
  display: inline-block;
  vertical-align: top;
  height: 16px;
  width: 16px;
  border: 1px solid #b8c2cc;
}

.checkbox + label::after {
  position: absolute;
  left: 2px;
  top: 4px;
  content: none;
  display: inline-block;
  height: 6px;
  width: 12px;
  border-left: 2px solid white;
  border-bottom: 2px solid white;
  transform: rotate(-45deg);
}

.checkbox:checked + label::before {
  background-color: #22292f;
  border-color: #22292f;
}

.checkbox:checked + label::after {
  content: "";
}

</style>
