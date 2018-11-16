<template>
  <div>
    <PageHeader> Inventory </PageHeader>

    <!-- <div class="container mx-auto my-10 md:my-12 px-4 flex flex-col md:flex-row items-right">
      <Button @click="routeToAdd">Add Item</Button>
    </div> -->

    <div class="container mx-auto my-10 md:my-12 px-4 flex flex-col md:flex-row">

      <div class="md:w-1/5 mb-4 md:mb-0">
        <h2 class="mb-5 uppercase text-sm tracking-wide text-black">
          Categories
        </h2>
        <div class="my-4" :key="category.id" v-for="category in categories">
          <input
            type="checkbox"
            class="checkbox hidden"
            :id="category.name"
            :value="category.name"
            v-model="selectedCategories"
          />
          <label :for="category.name" class="relative">
            <span class="ml-2 leading-none">{{category.name}}</span>
          </label>
        </div>
      </div>
      <table class="table-auto md:w-4/5">
        <thead class="uppercase bg-grey-light pb-8">
          <th>Item</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Updated</th>                    
          <th>Price</th>
        </thead>
        <tbody>
          <tr class="text-center hover:bg-grey-lighter leading-loose" v-for="product in filteredProducts" :key="product.id">
              <td>
                <router-link :to="{ path: `/admin/product/${product.id}` }">
                {{product.id}}
                </router-link>
              </td>
              <td>{{product.title}}</td>
              <td>{{product.stock}}</td>
              <td>{{ formatDate(product.updatedAt, "MM/DD/YYYY hh:mm A") }}</td>
              <td>{{product.price.toFixed(2)}}</td>
          </tr>
        </tbody>
      </table>

      </div>
    </div>
  </div>
</template>

<style>

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

<script>
import gql from "graphql-tag";
import format from 'date-fns/format';
import PageHeader from "@/components/PageHeader.vue";
import PRODUCTS from "@/graphql/Products.gql";
import CATEGORIES from "@/graphql/Categories.gql";
export default {
  components: { PageHeader },
  data() {
    return {
      products: [],
      categories: [],
      selectedCategories: []
    };
  },
  methods: {
    formatDate: format,
    routeToAdd() {
      this.$router.push({ path: "/admin/product/"});
    }
  },
  computed: {
    filteredProducts() {
      if (this.selectedCategories.length == 0) {
        return this.products;
      }
      return this.products.filter(product =>
        product.categories.some(category =>
          this.selectedCategories.includes(category.name),
        ),
      );
    },
  },
  apollo: {
    products: PRODUCTS,
    categories: CATEGORIES
  }
};
</script>
