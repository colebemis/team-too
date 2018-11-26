<template>
  <div>
    <PageHeader>Shop</PageHeader>
    <div
      class="container mx-auto my-10 md:my-12 px-4 flex flex-col md:flex-row"
    >
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
            <span class="ml-2 leading-none">{{ category.name }}</span>
          </label>
        </div>
      </div>
      <div class="grid md:w-4/5">
        <router-link
          class="block text-center hover:opacity-75"
          v-for="product in filteredProducts"
          :key="product.id"
          :to="`/product/${product.id}`"
        >
          <div class="flex flex-col">
            <div
              class="bg-image relative"
              :style="`background-image: url(${product.imageURL});`"
            >
              <div
                v-if="product.stock == 0"
                class="absolute pin bg-white opacity-75"
              />
              <div
                v-if="product.stock == 0"
                class="absolute pin flex items-center justify-center"
              >
                <span
                  class="bg-black text-white text-sm tracking-wide font-semibold py-2 px-3 uppercase"
                >
                  Out of stock
                </span>
              </div>
            </div>
            <span class="mt-4 text-black font-semibold leading-normal">
              {{ product.title }}
            </span>
            <span class="text-grey-darkest leading-normal">
              ${{ product.price.toFixed(2) }}
            </span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import gql from "graphql-tag";
import PageHeader from "@/components/PageHeader.vue";
import Footer from "@/components/Footer.vue";

export default Vue.extend({
  components: { PageHeader, Footer },
  data() {
    return {
      products: [],
      categories: [],
      selectedCategories: [],
    };
  },
  computed: {
    filteredProducts(): any {
      const selectedCategories: string[] = this.selectedCategories;

      if (selectedCategories.length === 0) {
        return this.products;
      }

      return this.products.filter((product: any) =>
        product.categories.some((category: any) =>
          selectedCategories.includes(category.name),
        ),
      );
    },
  },
  apollo: {
    products: gql`
      query products {
        products {
          id
          description
          title
          price
          imageURL
          stock
          categories {
            name
          }
        }
      }
    `,
    categories: gql`
      query categories {
        categories {
          id
          name
        }
      }
    `,
  },
});
</script>

<style scoped>
.grid {
  display: grid;
  column-gap: 24px;
  row-gap: 48px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

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

.bg-image {
  padding-bottom: 67%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
