<template>
  <div><PageHeader>Congrats!</PageHeader>

    <div v-if="$apollo.loading" class="my-20 text-center"><Loader/></div>
    <div v-else>
      <div class="mt-10 mb-20 container mx-auto">
          <span class="text-3xl">Congrats on your purchase, {{ (order.customer.name.split(" "))[0] }}!
              Your order was successfully placed.</span> <br><br>
          <span class="text-2xl">Your order is currently <b>{{ statusDisplayNames[order.status] || order.status }}</b>.</span>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from "vue";
import gql from "graphql-tag";
import { statusDisplayNames } from "../utils";
import PageHeader from "@/components/PageHeader.vue";
import Footer from "@/components/Footer.vue";
import Button from "@/components/Button.vue";
import Loader from "@/components/Loader.vue";

export default Vue.extend({
  components: { Button, Loader, Footer, PageHeader },
  data() {
    return {
        statusDisplayNames,
        orderID: this.$route.params.id,
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
              status
              total
              customer {
                  name
                  email
              }
              products {
                  title
                  quantity
              }
            }
          }
        `,
        variables: { id: this.$route.params.id },
      };
    },
  },
});
</script>
