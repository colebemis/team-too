<template>
  <div>
    <PageHeader>Shop</PageHeader>
    <div class="container mx-auto my-12 px-4">
      <div class="float-left">
        <h2 class="uppercase">Categories</h2>
        <div class="my-3" :key="category.id" v-for="category in categories">
            <input type="checkbox" class="check opacity-0" :id="category.name" :value="category.name" v-model="selectedCategories">
          <label :for="category.name" class="mx-1"> {{category.name}}  </label>
        </div>
      </div>
      <div class="grid float-right">
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

<script>
import gql from "graphql-tag";
import PageHeader from "@/components/PageHeader.vue";

export default {
  components: { PageHeader },
  data() {
    return {
      products: [],
      categories: [],
      selectedCategories: []
    };
  },

  computed: {
    filteredProducts: function() {
      if (this.selectedCategories.length > 0) {
        var productss = [];
        for (var i = 0; i < this.products.length; i++) {
          var hasCategory = false;
          for (var j = 0; j  < this.products[i].categories.length; j++) {
            if (this.selectedCategories.includes(this.products[i].categories[j].name)) {
              hasCategory = true;
              break;
            }
          }
          if (hasCategory) {
            productss.push(this.products[i]);
          }
        }
        return productss;
      }
      else
      {
        return this.products;
      }

  }
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
      }`
  },
}

</script>

<style scoped>
.grid {
  display: grid;
  column-gap: 24px;
  row-gap: 48px;
  width: 80%;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

label {
  position: relative;
}

.check + label::before {
    content: "";
    display:inline-block;
    height: 13px;
    width: 13px;
    border: 1px solid black;
}

.check + label::after {
  position: absolute;
  left: 2.5px;
  top: 5.5px;
  content: none;
  display: inline-block;
  height: 5px;
  width: 8px;
  border-left: 2px solid white;
  border-bottom: 2px solid white;
  
  transform: rotate(-45deg);

}

.check:checked + label::before {
  background: black;
}

.check:checked + label::after {
  content: ""
}


.bg-image {
  padding-bottom: 67%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
