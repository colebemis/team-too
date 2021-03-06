<template>
  <div>
    <PageHeader>Order</PageHeader>
    <div v-if="$apollo.loading" class="my-20 text-center"><Loader /></div>
    <div v-else-if="order">
      <div class="container mx-auto my-10 md:my-12 px-4 flex flex-col md:flex-row">
        <div id="ORDER_INFORMATION" class="flex-1">
          <div class="pb-8">
            <h2>GENERAL</h2>
            Order ID: {{ order.id }}<br>
            Date: {{ formatDate(order.createdAt, "dddd, MMMM, Do, YYYY") }}
          </div>

          <div class="pb-8">
            <h2>STATUS</h2>
            <select @change="handleStatusChange">
              <option v-for="status in statuses" :key="status" :selected="status === order.status" :value="status">{{ formatOrderStatus(status) }}</option>
            </select>
          </div>

          <div class="pb-8">
            <h2>CONTACT</h2>
            Name: {{ order.customer.name }}<br>
            Email: {{ order.customer.email }}
          </div>

          <div class="pb-8">
            <h2>BILLING DETAILS</h2>
            <div class="pb-6">
              {{ order.billingAddress.name }}<br>
              {{ order.billingAddress.line1 }}<br>
              <div v-if="order.billingAddress.line2!=null || order.billingAddress.line2.length>0">
                {{ order.billingAddress.line2 }}
              </div>
              {{ order.billingAddress.city }}, {{ order.billingAddress.state }} {{ order.billingAddress.zip }}
            </div>

            <div>
              {{ order.payment.name }}<br>
              Card: {{ showLastFour(order.payment.number) }}<br>
              Expiration Date: {{ formatDate(order.payment.expDate, "MM/YY") }}
            </div>
          </div>

          <div class="pb-8">
            <h2>SHIPPING DETAILS</h2>
            <div v-if="order.shippingAddress != null">
              {{ order.shippingAddress.name }}<br>
              {{ order.shippingAddress.line1 }}<br>
              <div v-if="order.shippingAddress.line2!=null || order.shippingAddress.line2.length>0">
                {{ order.shippingAddress.line2 }}
              </div>
              {{ order.shippingAddress.city }}, {{ order.shippingAddress.state }} {{ order.shippingAddress.zip }}<br>
            </div>
            <div v-else>
              No Shipping Address Provided<br><br>
            </div>
              Method:
                <span v-if="order.shippingAddress == null">Store Pick-Up</span>
                <span v-else>To Address</span>
          </div>
        </div>
        <div id="SUMMARY" class="flex-1">
          <h2>SUMMARY</h2>
          <table class="md:w-full">
            <tr id="tableHeader">
              <th>PRODUCT</th>
              <th>QUANTITY</th>
              <th>TOTAL</th>
            </tr>
            <tr v-for="product in order.products" :key="product.id" >
              <td>{{ product.title }}</td>
              <td>{{ product.quantity }}</td>
              <td>{{ product.price.toFixed(2) }}</td>
            </tr>
          </table>
          <div class="pt-4">
            Subtotal: ${{ order.subtotal.toFixed(2) }}<br>
            Tax: ${{ order.tax.toFixed(2) }}<br>
            Total: ${{ order.total.toFixed(2) }}
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      Unknown order id.
    </div>
  </div>
</template>

<script lang="ts">
import format from 'date-fns/format';
import gql from "graphql-tag";
import Vue from "vue";
import PageHeader from "@/components/PageHeader.vue";
import { statuses, statusDisplayNames } from "@/utils";
import ORDER_UPDATE_STATUS from "../graphql/OrderUpdateStatus.gql";
import ORDER_INFO from "../graphql/OrderInfo.gql";
import ORDERS from "../graphql/Orders.gql";
import Loader from "@/components/Loader.vue";

export default Vue.extend({
    components: { PageHeader, Loader },

  data() {
    return {
      order: null,
      statuses: Object.keys(statuses)
    };
  },
  apollo: {
    order() {
      return {
        query: ORDER_INFO,
        variables: {
          id: { id: this.$route.params.id }
        }
      };
    },
  },
  methods: {
    formatDate:format,
    formatOrderStatus(status){
      return statusDisplayNames[status];
    },
    showLastFour(cardNumber){
      return "**** ".repeat(3)+cardNumber.slice(-4);
    },
    handleStatusChange(event){
      this.$apollo.mutate ({
        mutation: ORDER_UPDATE_STATUS,
        // Mutation parameters
        variables: {
          id: this.order.id,
          status: event.target.value
        },

        
        // Update cache with result
        update: (store, { data: { handleStatusChange } }) => {
          try{
            // Read the data from our cache for this query.
            const data = store.readQuery({ query: ORDERS })
            
            const index = data.orders.findIndex(order => order.id === handleStatusChange.id);
            data.orders[index] = handleStatusChange;
          
            // Write our data back to the cache.
            store.writeQuery({ query: ORDERS, data })
            
          }
          catch(err){
            // nothing
          }
        },
        

      })
      return event.target.value;
    }
  }
});
</script>

<style scoped>
h2{
  padding-bottom: 4px;
}
</style>