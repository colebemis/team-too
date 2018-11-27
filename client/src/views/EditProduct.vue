<template>
  <div v-if="product">
    <PageHeader> Item </PageHeader>
    <div class="w-4/5 mt-10 mx-auto py-8 px-6">
      <form class="mb-5" @submit.prevent="updateProduct">
        <div class="mb-3">
          <label
            for="quantity"
            class="block mb-3 md:inline-block md:mr-5 md:w-2/5 md:text-right font-semibold text-xl"
            >Quantity</label
          >
          <input
            type="text"
            id="quantity"
            v-model.number="product.stock"
            class="border border-black p-2 mr-5 min-w-0"
          />
          <div class="inline-flex flex-row mt-5 md:mt-0">
            <Button
              type="button"
              class="mr-1"
              @click.native="product.stock = Number(product.stock) + 1;"
            >
              +
            </Button>
            <Button type="button" @click.native="product.stock -= 1;">-</Button>
          </div>
        </div>
        <div class="mb-3">
          <label
            for="title"
            class="block mb-3 md:inline-block md:mr-5 md:w-2/5 md:text-right font-semibold text-xl"
            >Display Name</label
          >
          <input
            type="text"
            v-model="product.title"
            class="border border-black p-2"
          />
        </div>
        <div class="mb-3">
          <label
            for="title"
            class="block mb-3 md:inline-block md:mr-5 md:w-2/5 md:text-right font-semibold text-xl"
            >Price($)</label
          >
          <input
            type="text"
            :value="product.price"
            class="border border-black p-2"
          />
        </div>
        <div class="mb-3">
          <label
            for="description"
            class="block mb-3 md:inline-block md:mr-5 md:w-2/5 md:text-right font-semibold text-xl"
            >Description</label
          >
          <textarea
            id="description"
            rows="5"
            cols="21"
            :value="product.description"
            class="border border-black md:align-top"
          ></textarea>
        </div>
        <div class="mb-3">
          <label
            for="title"
            class="block mb-3 md:inline-block md:mr-5 md:w-2/5 md:text-right font-semibold text-xl"
            >Image</label
          >
          <input
            type="text"
            :value="product.imageURL"
            class="border border-black p-2"
          />
        </div>
        <div class="mx-auto flex flex-row justify-center mt-10 md:mt-5">
          <Button class="mr-2" type="submit">Save Item</Button>

          <Button @click.native="returnToInventory">Cancel</Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import gql from "graphql-tag";
import PageHeader from "@/components/PageHeader.vue";
import Button from "@/components/Button.vue";
import PRODUCTS from "@/graphql/Products.gql";
import PRODUCT from "@/graphql/Product.gql";

export default Vue.extend({
  components: { PageHeader, Button },
  data() {
    return {
      product: null,
    };
  },
  apollo: {
    product() {
      return {
        query: PRODUCT,
        variables: { id: this.$route.params.id },
      };
    },
  },
  methods: {
    updateProduct() {
      this.$apollo.mutate({
        // Mutation
        mutation: gql`
          mutation($data: ProductUpdateInput!, $id: ID!) {
            updateProduct(data: $data, where: { id: $id }) {
              id
              description
              title
              price
              imageURL
              stock
              updatedAt
              categories {
                name
              }
            }
          }
        `,
        variables: {
          data: {
            imageURL: this.product.imageURL,
            title: this.product.title,
            description: this.product.description,
            price: this.product.price,
            stock: this.product.stock,
          },

          id: this.product.id,
        },
        update: (store, { data: { updateProduct } }) => {
          // Read the data from our cache for this query.
          const data = store.readQuery({ query: PRODUCTS });
          // console.log(store.readQuery({query: PRODUCTS}));
          const index = data.products.findIndex(product => product.id === updateProduct.id);
          data.products[index] = updateProduct;
          // Write our data back to the cache.
          store.writeQuery({ query: PRODUCTS, data });
        },
      });
      this.$router.push({ path: "/admin/inventory"});
    },
    returnToInventory() {
      this.$router.push({ path: "/admin/inventory" });
    },
  },
});
</script>
