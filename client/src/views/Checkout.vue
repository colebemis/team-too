<template>
  <div><PageHeader>Checkout</PageHeader>

    <div v-if="$apollo.loading" class="my-20 text-center"><Loader /></div>
    <div v-else>
      <div class="mt-10 mb-20 container mx-auto">

        <div class="flex mb-4">

            <!-- FORM -->
            <div class="w-1/2 bg-grey-light h-50">
                <form id="shopForm" class="container mx-auto px-20 mt-5 mb-10">

                    <!-- CONTACT -->
                    <div class="flex flex-wrap -mx-3 mb-6">

                      <!-- Header -->
                      <div class="w-full pt-5 pb-5 px-3">
                        <h1 class="block uppercase tracking-wide text-grey-darkest text-med font-bold mb-2">
                          CONTACT INFO
                        </h1>
                      </div>

                      <!-- First Name -->
                      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="contact-first-name">
                          First Name
                        </label>
                        <input v-model="contactFirstName" class="appearance-none block w-full bg-grey-lighter text-grey-darker rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="contact-first-name" type="text" placeholder="Bobby">
                      </div>

                      <!-- Last Name -->
                      <div class="w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="contact-last-name">
                          Last Name
                        </label>
                        <input v-model="contactLastName" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey" id="contact-last-name" type="text" placeholder="Doe">
                      </div>

                      <!-- Email -->
                      <div class="w-full pt-5 px-3">
                        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="contact-email">
                          Email
                        </label>
                        <input v-model="contactEmail" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey" id="contact-email" type="text" placeholder="janedoe@mail.com">
                      </div>
                    </div>

                    <!-- BILLING -->
                    <div class="flex flex-wrap -mx-3 mb-6 pt-10">

                      <!-- Header -->
                      <div class="w-full pt-5 pb-5 px-3">
                        <h1 class="block uppercase tracking-wide text-grey-darkest text-med font-bold mb-2">
                          BILLING ADDRESS
                        </h1>
                      </div>

                      <!-- First Name -->
                      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="billing-first-name">
                          First Name
                        </label>
                        <input v-model="billingFirstName" class="appearance-none block w-full bg-grey-lighter text-grey-darker rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="billing-first-name" type="text" placeholder="Jane">
                      </div>

                      <!-- Last Name -->
                      <div class="w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="billing-last-name">
                          Last Name
                        </label>
                        <input v-model="billingLastName" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey" id="billing-last-name" type="text" placeholder="Doe">
                      </div>

                      <!-- Address -->
                      <div class="w-full pt-5 px-3">
                        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="billing-address">
                          Address
                        </label>
                        <input v-model="billingAddress" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey" id="billing-address" type="text" placeholder="123 Foothill Blvd">
                      </div>

                      <div class="w-full pt-5 px-3">
                          <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="billing-city">
                            City
                          </label>
                          <input v-model="billingCity" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey" id="billing-city" type="text" placeholder="San Luis Obispo">
                        </div>

                      <div class="flex flex-wrap">
                        
                        <div class="w-full md:w-1/2 px-3 pt-5">
                          <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="billing-state">
                            State
                          </label>
                          <div class="relative">
                            <select v-model="billingState" class="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-grey" id="billing-state">
                              <option value="AL">Alabama</option>
                              <option value="AK">Alaska</option>
                              <option value="AZ">Arizona</option>
                              <option value="AR">Arkansas</option>
                              <option value="CA">California</option>
                              <option value="CO">Colorado</option>
                              <option value="CT">Connecticut</option>
                              <option value="DE">Delaware</option>
                              <option value="FL">Florida</option>
                              <option value="GA">Georgia</option>
                              <option value="HI">Hawaii</option>
                              <option value="ID">Idaho</option>
                              <option value="IL">Illinois</option>
                              <option value="IN">Indiana</option>
                              <option value="IA">Iowa</option>
                              <option value="KS">Kansas</option>
                              <option value="KY">Kentucky</option>
                              <option value="LA">Louisiana</option>
                              <option value="ME">Maine</option>
                              <option value="MD">Maryland</option>
                              <option value="MA">Massachusetts</option>
                              <option value="MI">Michigan</option>
                              <option value="MN">Minnesota</option>
                              <option value="MS">Mississippi</option>
                              <option value="MO">Missouri</option>
                              <option value="MT">Montana</option>
                              <option value="NE">Nebraska</option>
                              <option value="NV">Nevada</option>
                              <option value="NH">New Hampshire</option>
                              <option value="NJ">New Jersey</option>
                              <option value="NM">New Mexico</option>
                              <option value="NY">New York</option>
                              <option value="NC">North Carolina</option>
                              <option value="ND">North Dakota</option>
                              <option value="OH">Ohio</option>
                              <option value="OK">Oklahoma</option>
                              <option value="OR">Oregon</option>
                              <option value="PA">Pennsylvania</option>
                              <option value="RI">Rhode Island</option>
                              <option value="SC">South Carolina</option>
                              <option value="SD">South Dakota</option>
                              <option value="TN">Tennessee</option>
                              <option value="TX">Texas</option>
                              <option value="UT">Utah</option>
                              <option value="VT">Vermont</option>
                              <option value="VA">Virginia</option>
                              <option value="WA">Washington</option>
                              <option value="WV">West Virginia</option>
                              <option value="WI">Wisconsin</option>
                              <option value="WY">Wyoming</option>
                            </select>
                            <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                          </div>
                        </div>
                        <div class="w-full md:w-1/2 px-3 pt-5">
                          <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="billing-zip">
                            Zip
                          </label>
                          <input v-model="billingZip" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey" id="billing-zip" type="text" placeholder="93401">
                        </div>
                      </div>
                    </div>

                    <!-- SHIPPING -->
                    <div class="flex flex-wrap -mx-3 mb-6 pt-10">

                      <!-- Header -->
                      <div class="w-full pt-5 pb-5 px-3">
                        <h1 class="block uppercase tracking-wide text-grey-darkest text-med font-bold mb-2">
                          SHIPPING ADDRESS
                        </h1>
                      </div>

                      <!-- First Name -->
                      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="shipping-first-name">
                          First Name
                        </label>
                        <input v-model="shippingFirstName" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="shipping-first-name" type="text" placeholder="Jane">
                        <p class="text-red text-xs italic">Please fill out this field.</p>
                      </div>

                      <!-- Last Name -->
                      <div class="w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="shipping-last-name">
                          Last Name
                        </label>
                        <input v-model="shippingLastName" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey" id="shipping-last-name" type="text" placeholder="Doe">
                      </div>

                      <!-- Address -->
                      <div class="w-full pt-5 px-3">
                        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="shipping-address">
                          Address
                        </label>
                        <input v-model="shippingAddress" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey" id="shipping-address" type="text" placeholder="123 Foothill Blvd">
                      </div>

                      <div class="w-full pt-5 px-3">
                          <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="shipping-city">
                            City
                          </label>
                          <input v-model="shippingCity" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey" id="shipping-city" type="text" placeholder="San Luis Obispo">
                        </div>

                      <div class="flex flex-wrap">
                        
                        <div class="w-full md:w-1/2 px-3 pt-5">
                          <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="shipping-state">
                            State
                          </label>
                          <div class="relative">
                            <select v-model="shippingState" class="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-grey" id="shipping-state">
                              <option value="AL">Alabama</option>
                              <option value="AK">Alaska</option>
                              <option value="AZ">Arizona</option>
                              <option value="AR">Arkansas</option>
                              <option value="CA">California</option>
                              <option value="CO">Colorado</option>
                              <option value="CT">Connecticut</option>
                              <option value="DE">Delaware</option>
                              <option value="FL">Florida</option>
                              <option value="GA">Georgia</option>
                              <option value="HI">Hawaii</option>
                              <option value="ID">Idaho</option>
                              <option value="IL">Illinois</option>
                              <option value="IN">Indiana</option>
                              <option value="IA">Iowa</option>
                              <option value="KS">Kansas</option>
                              <option value="KY">Kentucky</option>
                              <option value="LA">Louisiana</option>
                              <option value="ME">Maine</option>
                              <option value="MD">Maryland</option>
                              <option value="MA">Massachusetts</option>
                              <option value="MI">Michigan</option>
                              <option value="MN">Minnesota</option>
                              <option value="MS">Mississippi</option>
                              <option value="MO">Missouri</option>
                              <option value="MT">Montana</option>
                              <option value="NE">Nebraska</option>
                              <option value="NV">Nevada</option>
                              <option value="NH">New Hampshire</option>
                              <option value="NJ">New Jersey</option>
                              <option value="NM">New Mexico</option>
                              <option value="NY">New York</option>
                              <option value="NC">North Carolina</option>
                              <option value="ND">North Dakota</option>
                              <option value="OH">Ohio</option>
                              <option value="OK">Oklahoma</option>
                              <option value="OR">Oregon</option>
                              <option value="PA">Pennsylvania</option>
                              <option value="RI">Rhode Island</option>
                              <option value="SC">South Carolina</option>
                              <option value="SD">South Dakota</option>
                              <option value="TN">Tennessee</option>
                              <option value="TX">Texas</option>
                              <option value="UT">Utah</option>
                              <option value="VT">Vermont</option>
                              <option value="VA">Virginia</option>
                              <option value="WA">Washington</option>
                              <option value="WV">West Virginia</option>
                              <option value="WI">Wisconsin</option>
                              <option value="WY">Wyoming</option>
                            </select>
                            <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                          </div>
                        </div>
                        <div class="w-full md:w-1/2 px-3 pt-5">
                          <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="shipping-zip">
                            Zip
                          </label>
                          <input v-model="shippingZip" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey" id="shipping-zip" type="text" placeholder="93401">
                        </div>
                      </div>
                    </div>

                    <!-- PAYMENT - CREDIT CARD INFO - BILLING INFO -->
                    <div class="flex flex-wrap -mx-3 mb-6 pt-10">

                      <!-- Header -->
                      <div class="w-full pt-5 pb-5 px-3">
                        <h1 class="block uppercase tracking-wide text-grey-darkest text-med font-bold mb-2">
                          BILLING INFO 
                        </h1>
                      </div>

                      <!-- First Name -->
                      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="payment-first-name">
                          First Name
                        </label>
                        <input v-model="paymentFirstName" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="payment-first-name" type="text" placeholder="Jane">
                        <p class="text-red text-xs italic">Please fill out this field.</p>
                      </div>

                      <!-- Last Name -->
                      <div class="w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="payment-last-name">
                          Last Name
                        </label>
                        <input v-model="paymentLastName" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey" id="payment-last-name" type="text" placeholder="Doe">
                      </div>

                      <!-- Card Number -->
                      <div class="w-full pt-5 px-3">
                        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="credit-card-number">
                          Credit Card Number
                        </label>
                        <input v-model="creditCardNumber" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey" id="credit-card-number" type="text" placeholder="0123 4567 8910 1112">
                      </div>

                      <div class="flex flex-wrap">
                        <div class="w-full md:w-1/2 px-3 pt-5">
                          <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="credit-card-exp-date">
                            Expiry Date
                          </label>
                          <input v-model="creditCardExpDate" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey" id="credit-card-exp-date" type="text" placeholder="MM/YYYY">
                        </div>

                        <div class="w-full md:w-1/2 px-3 pt-5">
                          <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="credit-card-CVV">
                            CVV
                          </label>
                          <input v-model="creditCardCVV" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey" id="credit-card-CVV" type="text" placeholder="000">
                        </div>
                      </div>
                    </div>


                  </form>
            </div>

            <!-- CART SUMMARY -->
            <div class="w-1/2 ml-10">
              <div class = "sticky pin-t">
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

                <Button
                v-on:click="checkForm"
                class="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-2 mb-7 rounded-r rounded-l"
                >
                    CONFIRM PURCHASE
                </Button>
                
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
      contactFirstName: "",
      contactLastName: "",
      contactEmail: "",

      billingFirstName: "",
      billingLastName: "",
      billingAddress: "",
      billingCity: "",
      billingState: "",
      billingZip: "",

      shippingFirstName: "",
      shippingLastName: "",
      shippingAddress: "",
      shippingCity: "",
      shippingState: "",
      shippingZip: "",

      paymentFirstName: "",
      paymentLastName: "",
      creditCardNumber: "",
      creditCardCVV: "",
      creditCardExpDate: "",

      orderProducts: [],
      customerInfo: {},
      shippingInfo: {},
      billingInfo: {},
      paymentInfo: {},
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

    tax(): number {
      return this.subtotal * 0.0725;
    },

    total(): number {
      return this.subtotal + this.tax;
    },
  },
  methods: {

  createOrder() {
    this.$apollo.mutate({
      // Mutation
      mutation: gql`
        mutation($data: OrderCreateInput!) {
          createOrder(data: $data) {
            id
          }
        }
      `,
      variables: {
        data: {
          status: "Pending",
          products: {create: this.orderProducts},
          customer: {create: this.customerInfo},
          shippingAddress: {create: this.shippingInfo},
          billingAddress: {create: this.billingInfo},
          payment: {create: this.paymentInfo},
          subtotal: this.subtotal,
          tax: this.tax,
          total: this.total,
        }
      },
    });
   },

    checkForm(){
      this.products.forEach((product) => {
        // console.log(product.title);
        // console.log(this.cart[product.id]);
        // console.log(product.price);

        const orderProduct = {title:product.title, imageURL:product.imageURL, description:product.description, 
          price:product.price, quantity:this.cart[product.id]};

        this.orderProducts.push(orderProduct);
      });

      this.customerInfo = {name: this.contactFirstName + " " + this.contactLastName, email: this.contactEmail};
      this.shippingInfo = {name: this.shippingFirstName + " " + this.shippingLastName, line1: this.shippingAddress, line2: " ",
                             city: this.shippingCity, state: this.shippingState, zip: this.shippingZip};

      this.billingInfo = {name: this.billingFirstName + this.billingLastName, line1: this.billingAddress, line2: " ",
                             city: this.billingCity, state: this.billingState, zip: this.billingZip};

      this.paymentInfo = {name: this.billingFirstName + this.billingLastName, number: this.creditCardNumber, 
                         expDate: this.creditCardExpDate, cvv: this.creditCardCVV};

      // console.log(this.customerInfo);
      // console.log(this.shippingInfo);
      // console.log(this.billingInfo);

      this.createOrder();
    }
  },
});
</script>