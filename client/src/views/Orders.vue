<template>
  <div>
    <PageHeader>Orders</PageHeader>
    <div
      class="container mx-auto my-10 md:my-12 px-4 flex flex-col md:flex-row"
    >
      <div class="md:w-1/5 mb-4 md:mb-0">
        <h2 class="mb-5 uppercase text-sm tracking-wide text-black">
          Order Type
        </h2>
        <div
          class="my-4"
          :key="deliveryType"
          v-for="deliveryType in deliveryTypes"
        >
          <input
            type="checkbox"
            class="checkbox hidden"
            :id="deliveryType"
            :value="deliveryType"
            v-model="selectedDeliveryTypes"
          />
          <label :for="deliveryType" class="relative">
            <span class="ml-2 leading-none">{{ deliveryType }}</span>
          </label>
        </div>

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
            <span class="ml-2 leading-none">{{
              formatOrderStatus(status)
            }}</span>
          </label>
        </div>
      </div>

      <table class="table-auto md:w-4/5">
        <tr class="bg-grey-light pb-8">
          <th>Order ID</th>
          <th>Status</th>
          <th>Type</th>
          <th>Date</th>
          <th>Customer</th>
        </tr>

        <tr
          v-for="order in filteredOrders"
          :key="order.id"
          class="hover:bg-grey-lighter mt-10 text-center"
        >
          <td>
            <router-link :to="{ path: `/admin/order/${order.id}` }">
              {{ order.id }}
            </router-link>
          </td>
          <td>{{ formatOrderStatus(order.status) }}</td>
          <td>{{ order.shippingAddress ? "Delivery" : "Store Pick-Up" }}</td>
          <td>{{ formatDate(order.createdAt, "MM/DD/YYYY hh:mm A") }}</td>
          <td>{{ order.customer.name }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import format from "date-fns/format";
import gql from "graphql-tag";
import PageHeader from "@/components/PageHeader.vue";
import { statuses, statusDisplayNames } from "@/utils";
import ORDERS from "../graphql/Orders.gql";

export default Vue.extend({
  components: { PageHeader },
  data() {
    return {
      orders: [],
      deliveryTypes: ["Delivery", "Store Pick-Up"],
      statuses: Object.keys(statuses),
      selectedStatuses: [],
      selectedDeliveryTypes: [],
    };
  },
  computed: {
    filteredOrders(): any {
      const selectedDeliveryTypes: string[] = this.selectedDeliveryTypes;
      const selectedStatuses: string[] = this.selectedStatuses;
      // if no filters are selected or all filters are selected...
      if (
        (selectedStatuses.length === 0 && selectedDeliveryTypes.length === 0) ||
        (selectedStatuses.length === this.statuses.length &&
          selectedDeliveryTypes.length === this.deliveryTypes.length) ||
        (selectedStatuses.length === this.statuses.length &&
          selectedDeliveryTypes.length === 0) ||
        (selectedStatuses.length === 0 &&
          selectedDeliveryTypes.length === this.deliveryTypes.length)
      ) {
        // console.log("zero/all filters selected; returning all orders");
        return this.orders;
      }
      // no statuses are selected or all statuses are selected...
      else if (
        selectedStatuses.length === 0 ||
        selectedStatuses.length === this.statuses.length
      ) {
        // console.log("zero/all order statuses selected; filtering by delivery types");
        return this.orders.filter((order: any) =>
          selectedDeliveryTypes.includes(
            order.shippingAddress === null ? "Store Pick-Up" : "Delivery",
          ),
        );
      }
      // no delivery types are selected or all delivery types are selected...
      else if (
        selectedDeliveryTypes.length === 0 ||
        selectedDeliveryTypes.length === this.deliveryTypes.length
      ) {
        // console.log("zero/all delivery types selected; filtering by order status");
        return this.orders.filter((order: any) =>
          selectedStatuses.includes(order.status),
        );
      }

      return this.orders.filter(
        (order: any) =>
          selectedStatuses.includes(order.status) &&
          selectedDeliveryTypes.includes(
            order.shippingAddress === null ? "Store Pick-Up" : "Delivery",
          ),
      );
    },
  },
  apollo: {
    orders: ORDERS,
  },
  methods: {
    formatDate: format,
    formatOrderStatus(status: string) {
      return statusDisplayNames[status];
    },
  },
});
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
