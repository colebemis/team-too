<template>
  <div><PageHeader>Checkout</PageHeader>

    <div v-if="$apollo.loading" class="my-20 text-center"><Loader /></div>
    <div v-else>
      <div class="mt-10 mb-20 container mx-auto">

        <div class="flex mb-4">

            <!-- FORM -->
            <div class="w-1/2 bg-grey-light h-50">
                <form class="container mx-auto px-20 mt-5 mb-10">
                    <!-- Contact -->
                    <div class="flex flex-wrap -mx-3 mb-6">

                      <!-- Header -->
                      <div class="w-full pt-5 pb-5 px-3">
                        <h1 class="block uppercase tracking-wide text-grey-darkest text-med font-bold mb-2">
                          CONTACT INFO
                        </h1>
                      </div>

                      <!-- First Name -->
                      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
                          First Name
                        </label>
                        <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane">
                        <p class="text-red text-xs italic">Please fill out this field.</p>
                      </div>

                      <!-- Last Name -->
                      <div class="w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-last-name">
                          Last Name
                        </label>
                        <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey" id="grid-last-name" type="text" placeholder="Doe">
                      </div>

                      <!-- Email -->
                      <div class="w-full pt-5 px-3">
                        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-last-name">
                          Email
                        </label>
                        <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey" id="grid-last-name" type="text" placeholder="janedoe@mail.com">
                      </div>
                    </div>
                  </form>

            </div>

            <!-- CART SUMMARY -->
            <div class="w-1/2 ml-5">
                <!-- Header -->
                <div class="w-full mt-5 mb-10 pt-5 px-10">
                  <h1 class="block uppercase tracking-wide text-grey-darkest text-med font-bold mb-2">
                    YOUR ORDER SUMMARY
                  </h1>
                </div>

                <div class="container mx-auto mb-10">
                  <div
                    class="gridHeader text-grey-darkest border border-solid border-grey-dark"
                  >
                    <div class="">PRODUCT</div>
                    <div class="text-center">QUANTITY</div>
                    <div class="text-right">PRICE</div>
                  </div>

                  <div
                    class="flex mt-5 text-center border border-solid border-grey-dark "
                    :key="product.id"
                    v-for="product in products"
                    v-if="cart[product.id] > 0"
                  >
                    <!-- Product Info: image and title - 2 columns -->
                    <router-link
                      class="flex bg-grey-light items-center justify-start w-1/3 hover:opacity-75"
                      :to="`/product/${product.id}`"
                    >

                      <!-- Title -->
                      <div class="items-center text-center font-semibold ml-3">
                        {{ product.title }}
                      </div>
                    </router-link>

                    <!-- Product Quantity -->
                    <div
                      class="bg-grey-lighter flex items-center justify-center w-1/3"
                    >
                      <!-- Quantity -->
                      <div class="h-12 pt-4">{{ cart[product.id] }}</div>
                    </div>

                    <!-- Product Price -->
                    <div class="bg-grey flex items-center justify-end w-1/3 pr-5">
                      <span class="ml-2 ">
                        &#32; ${{ (product.price * cart[product.id]).toFixed(2) }}
                      </span>
                    </div>
                  </div>

                  <!-- Subtotal -->
                  <div class="flex items-center justify-center mt-10">
                    <div class="w-1/3 h-12"></div>
                    <div
                      class="w-1/3 text-center bg-grey-lightest border border-solid border-grey-dark h-12 pt-3"
                    >
                      SUBTOTAL
                    </div>
                    <div
                      class="w-1/3 bg-grey-light text-center border border-solid border-grey-dark h-12 pt-3"
                    >
                      $ {{ subtotal.toFixed(2) }}
                    </div>
                  </div>

                  <!-- Tax -->
                  <div class="flex items-center justify-center">
                    <div class="w-1/3 h-12"></div>
                    <div
                      class="w-1/3 bg-grey-lightest border border-solid border-grey-dark text-center h-12 pt-3"
                    >
                      TAX
                    </div>
                    <div
                      class="w-1/3 bg-grey-light text-center border border-solid border-grey-dark h-12 pt-3"
                    >
                      $ {{ (subtotal * 0.0725).toFixed(2) }}
                    </div>
                  </div>

                  <!-- Total Price -->
                  <div class="flex items-center justify-center">
                    <div class="w-1/3 h-12"></div>
                    <div
                      class="w-1/3 bg-grey-lightest font-semibold border border-solid border-grey-dark text-center h-12 pt-3"
                    >
                      TOTAL
                    </div>
                    <div
                      class="w-1/3 bg-grey-light font-semibold text-center border border-solid border-grey-dark h-12 pt-3"
                    >
                      $ {{ (subtotal * 0.0725 + subtotal).toFixed(2) }}
                    </div>
                  </div>
        
                </div>
                
            </div>
        </div>

      </div>
    </div>

  </div> 
</template>

<style>
.pageHead {
  text-align: center;
  font-size: 20pt;
  font-weight: bolder;
}

.gridHeader {
  display: grid;
  padding: 10px;
  grid-template-columns: repeat(3, 1fr);
  font-weight: bold;
}

.bg-image {
  padding-bottom: 67%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.gridRow {
  display: grid;
  padding: 50px;
  grid-template-columns: repeat(3, 1fr);
  font-weight: regular;
}

hr {
  opacity: 0.5;
  margin-top: 10px;
  margin-bottom: 30px;
}

.body {
  font-family: "Work sans", "Avenir", Helvetica, Arial, sans-serif;
  width: 80%;
  margin: auto;
  border: 1px solid grey;
}
</style>

<script lang="ts">
import Vue from "vue";
import gql from "graphql-tag";
import PageHeader from "@/components/PageHeader.vue";
import Footer from "@/components/Footer.vue";
import Loader from "@/components/Loader.vue";

export default Vue.extend({
  components: { PageHeader, Footer, Loader },
  data() {
    return {
      cart: JSON.parse(localStorage.getItem("cart") || "{}"),
      products: [],
    };
  },
  
  apollo: {
    products() {
      return {
        query: gql`
          query cartProducts($ids: [ProductWhereInput!]) {
            products(where: { OR: $ids }) {
              id
              title
              imageURL
              description
              price
              stock
            }
          }
        `,
        variables: {
          ids: Object.keys(this.cart).map(id => ({ id })),
        },
      };
    },
  },
  computed: {
    subtotal(): number {
      return this.products.reduce(
        (subtotal, currentProduct: { id: string; price: number }) =>
          subtotal + currentProduct.price * this.cart[currentProduct.id],
        0,
      );
    },
  },
  methods: {
  },
});
</script>