<template>
  <div>
    <PageHeader>Checkout</PageHeader>
    <div v-if="$apollo.loading" class="my-20 text-center"><Loader /></div>
    <div v-else>
      <div class="mt-10 mb-20 container mx-auto">
        <div class="flex mb-4">
          <!-- FORM -->
          <div class="w-1/2 bg-grey-lighter h-50">
            <form id="shopForm" class="container mx-auto p-10">
              <div
                v-if="!formValid && btnPressed"
                class="font-bold mb-5 bg-red-lightest border border-red-light text-red-dark px-4 py-3 mr-5 text-sm rounded relative"
                role="alert"
              >
                <p>
                  Please ensure all fields are correctly filled before continuing.
                </p>
              </div>

              <!-- CONTACT -->
              <div class="flex flex-col -mx-3 mb-20">
                <!-- Header -->
                <h2 class="text-black font-semibold mb-8 px-3 text-3xl">
                  Contact Info
                </h2>

                <div class="flex">
                  <!-- First Name -->
                  <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <Label for="contact-first-name">First Name</label>
                    <Input
                      name="First Name"
                      v-validate="'required|alpha'"
                      v-model="contactFirstName"
                      id="contact-first-name"
                      type="text"
                      placeholder="Jane"
                    />
                    <div class="mt-1">
                      <span
                        v-show="errors.has('First Name')"
                        class="text-red text-sm relative help is-danger"
                      >
                        {{ errors.first("First Name") }}
                      </span>
                    </div>
                  </div>

                  <!-- Last Name -->
                  <div class="w-full md:w-1/2 px-3">
                    <Label for="contact-last-name">Last Name</Label>
                    <Input
                      name="Last Name"
                      v-validate="'required|alpha'"
                      v-model="contactLastName"
                      id="contact-last-name"
                      type="text"
                      placeholder="Doe"
                    />
                    <div class="mt-1">
                      <span
                        v-show="errors.has('Last Name')"
                        class="text-red text-sm relative help is-danger"
                      >
                        {{ errors.first("Last Name") }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Email -->
                <div class="w-full pt-5 px-3">
                  <Label for="contact-email">Email</label>
                  <Input
                    v-validate="'required|email'"
                    name="email"
                    type="text"
                    v-model="contactEmail"
                    id="contact-email"
                    placeholder="janedoe@mail.com"
                  />
                  <div class="mt-1">
                    <span
                      v-show="errors.has('email')"
                      class="text-red text-xs relative help is-danger"
                      >{{ errors.first("email") }}</span
                    >
                  </div>
                </div>
              </div>

              <!-- BILLING -->
              <div class="flex flex-col -mx-3 mb-20">
                <!-- Header -->
                <h2 class="text-black font-semibold mb-8 px-3 text-3xl">
                  Billing Address
                </h2>

                <div class="flex">
                  <!-- First Name -->
                  <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <Label for="billing-first-name">
                      First Name
                    </Label>
                    <Input
                      name="Billing First Name"
                      v-validate="'required|alpha'"
                      v-model="billingFirstName"
                      id="billing-first-name"
                      type="text"
                      placeholder="Jane"
                    />
                    <div class="mt-1">
                      <span
                        v-show="errors.has('Billing First Name')"
                        class="text-red text-sm relative help is-danger"
                      >
                        {{ errors.first("Billing First Name") }}
                      </span>
                    </div>
                  </div>

                  <!-- Last Name -->
                  <div class="w-full md:w-1/2 px-3">
                    <Label for="billing-last-name">
                      Last Name
                    </Label>
                    <Input
                      name="Billing Last Name"
                      v-validate="'required|alpha'"
                      v-model="billingLastName"
                      id="billing-last-name"
                      type="text"
                      placeholder="Doe"
                    />
                    <div class="mt-1">
                      <span
                        v-show="errors.has('Billing Last Name')"
                        class="text-red text-sm relative help is-danger"
                      >
                      {{ errors.first("Billing Last Name") }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Address -->
                <div class="w-full pt-5 px-3">
                  <Label for="billing-address">Address</label>
                  <Input
                    v-model="billingAddress"
                    id="billing-address"
                    type="text"
                    placeholder="123 Foothill Blvd"
                  />
                </div>

                <div class="w-full pt-5 px-3">
                  <Label for="billing-city">
                    City
                  </label>
                  <Input
                    v-model="billingCity"
                    id="billing-city"
                    type="text"
                    placeholder="San Luis Obispo"
                  />
                </div>

                <div class="flex flex-wrap">
                  <div class="w-full md:w-1/2 px-3 pt-5">
                    <Label for="billing-state">State</label>
                    <StateSelect v-model="billingState" id="billing-state" />
                  </div>
                  <div class="w-full md:w-1/2 px-3 pt-5">
                    <Label for="billing-zip">Zip</Label>
                    <Input
                      name="Billing ZIP Code"
                      v-validate="'required|numeric'"
                      v-model="billingZip"
                      id="billing-zip"
                      type="text"
                      placeholder="93401"
                    />
                    <div class="mt-1">
                      <span
                        v-show="errors.has('Billing ZIP Code')"
                        class="text-red text-sm relative help is-danger"
                      >
                        {{ errors.first("Billing ZIP Code") }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- SHIPPING METHOD-->
              <div class="flex flex-col -mx-3 mb-20">

                <!-- Header -->
                  <h2 class="text-black font-semibold mb-8 px-3 text-3xl">
                    Shipping Method
                  </h2>

                  <div class="flex">
                      <div class="flex w-1/2">
                        <input type="radio" v-model="shippingMethod" id="storePickup" value="storePickup"
                              checked>
                        <label for="storePickup" class="mx-2 block uppercase text-grey-darkest">Store Pickup</label>
                      </div>

                      <div class="flex w-1/2">
                        <input type="radio" v-model="shippingMethod" :disabled="!orderIsDeliverable" id="delivery" value="delivery">
                        <label for="delivery" class="mx-2 block uppercase text-grey-darkest">Delivery</label>
                      </div>
                  </div>
              </div>

              <!-- SHIPPING -->
              <div v-if="orderByDelivery" class="flex flex-col -mx-3 mb-20">
                <!-- Header -->
                <h2 class="text-black font-semibold mb-8 px-3 text-3xl">
                  Shipping Address
                </h2>

                <div class="flex flex-wrap">
                  <!-- First Name -->
                  <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <Label for="shipping-first-name">First Name</label>
                    <Input
                      name="Shipping First Name"
                      v-validate="'required|alpha'"
                      v-model="shippingFirstName"
                      id="shipping-first-name"
                      type="text"
                      placeholder="Jane"
                    />
                    <div class="mt-1">
                      <span
                        v-show="errors.has('Shipping First Name')"
                        class="text-red text-xs relative help is-danger"
                      >
                        {{ errors.first("Shipping First Name") }}
                      </span>
                    </div>
                  </div>

                  <!-- Last Name -->
                  <div class="w-full md:w-1/2 px-3">
                    <Label for="shipping-last-name">Last Name</Label>
                    <Input
                      name="Shipping Last Name"
                      v-validate="'required|alpha'"
                      v-model="shippingLastName"
                      id="shipping-last-name"
                      type="text"
                      placeholder="Doe"
                    />
                    <div class="mt-1">
                      <span
                        v-show="errors.has('Shipping Last Name')"
                        class="text-red text-xs relative help is-danger"
                      >
                        {{ errors.first("Shipping Last Name") }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Address -->
                <div class="w-full pt-5 px-3">
                  <Label for="shipping-address">Address</Label>
                  <Input
                    v-model="shippingAddress"
                    id="shipping-address"
                    type="text"
                    placeholder="123 Foothill Blvd"
                  />
                </div>

                <div class="w-full pt-5 px-3">
                  <Label for="shipping-city">City</label>
                  <Input
                    v-model="shippingCity"
                    id="shipping-city"
                    type="text"
                    placeholder="San Luis Obispo"
                  />
                </div>

                <div class="flex flex-wrap">
                  <div class="w-full md:w-1/2 px-3 pt-5">
                    <Label for="shipping-state">
                      State
                    </Label>
                    <div class="relative">
                      <StateSelect v-model="shippingState" id="shipping-state" />
                      <div
                        class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker"
                      >
                        <svg
                          class="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div class="w-full md:w-1/2 px-3 pt-5">
                    <Label for="shipping-zip">Zip</Label>
                    <Input
                      name="Shipping ZIP Code"
                      v-validate="'required|numeric'"
                      v-model="shippingZip"
                      id="shipping-zip"
                      type="text"
                      placeholder="93401"
                    />
                    <div class="mt-1">
                      <span
                        v-show="errors.has('Shipping ZIP Code')"
                        class="text-red text-xs relative help is-danger"
                        >{{ errors.first("Shipping ZIP Code") }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>

              <!-- PAYMENT INFO -->
              <div class="flex flex-col -mx-3">
                <!-- Header -->
                <h2 class="text-black font-semibold mb-8 px-3 text-3xl">
                  Payment Info
                </h2>

                <div class="flex">
                  <!-- First Name -->
                  <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <Label for="payment-first-name">
                      First Name
                    </Label>
                    <Input
                      name="Payment First Name"
                      v-validate="'required|alpha'"
                      v-model="paymentFirstName"
                      id="payment-first-name"
                      type="text"
                      placeholder="Jane"
                    />
                    <div class="mt-1">
                      <span
                        v-show="errors.has('Payment First Name')"
                        class="text-red text-sm relative help is-danger"
                      >
                        {{ errors.first("Payment First Name") }}
                      </span>
                    </div>
                  </div>

                  <!-- Last Name -->
                  <div class="w-full md:w-1/2 px-3">
                    <Label for="payment-last-name">Last Name</Label>
                    <Input
                      name="Payment Last Name"
                      v-validate="'required|alpha'"
                      v-model="paymentLastName"
                      id="payment-last-name"
                      type="text"
                      placeholder="Doe"
                    />
                    <div class="mt-1">
                      <span
                        v-show="errors.has('Payment Last Name')"
                        class="text-red text-sm relative help is-danger"
                      >
                        {{ errors.first("Payment Last Name") }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Card Number -->
                <div class="w-full pt-5 px-3">
                  <Label for="credit-card-number">Credit Card Number</label>
                  <Input
                    name="Credit Card Number"
                    v-validate="'required|numeric'"
                    v-model="creditCardNumber"
                    id="credit-card-number"
                    type="text"
                    placeholder="0123 4567 8910 1112"
                  />
                  <div class="mt-1">
                    <span
                      v-show="errors.has('Credit Card Number')"
                      class="text-red text-sm relative help is-danger"
                    >
                      {{ errors.first("Credit Card Number") }}
                    </span>
                  </div>
                </div>

                <div class="flex flex-wrap">
                  <div class="w-full md:w-1/2 px-3 pt-5">
                    <Label for="credit-card-exp-date">
                      Expiry Date
                    </Label>
                    <Input
                      v-model="creditCardExpDate"
                      id="credit-card-exp-date"
                      type="month"
                      placeholder="MM/YYYY"
                    />
                  </div>

                  <div class="w-full md:w-1/2 px-3 pt-5">
                    <Label for="credit-card-CVV">CVV</label>
                    <Input
                      name="CCV"
                      v-validate="'required|numeric'"
                      v-model="creditCardCVV"
                      id="credit-card-CVV"
                      placeholder="000"
                    />
                    <div class="mt-1">
                      <span
                        v-show="errors.has('CCV')"
                        class="text-red text-sm relative help is-danger"
                      >
                        {{ errors.first("CCV") }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div> 

            <!-- CART SUMMARY -->
          <div class="w-1/2 ml-10">
            <div class="sticky pin-t">
              <!-- Header -->
              <div class="w-full mt-5 mb-10 pt-5">
                <h2 class="text-black font-semibold mb-8 text-3xl">
                  Your Order Summary
                </h2>
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
                    class="flex bg-grey-lightest items-center justify-start w-1/3 hover:opacity-75"
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
                  <div
                    class="bg-grey-light flex items-center justify-end w-1/3 pr-5"
                  >
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

                <!-- Checkout Button -->
                <div class="flex justify-end">
                  <Button @click.native="submitForm">Confirm Purchase</Button>
                </div>
              </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  
</template>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

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

</style>

<script lang="ts">
import Vue from "vue";
import VeeValidate from "vee-validate";
import gql from "graphql-tag";
import PageHeader from "@/components/PageHeader.vue";
import Footer from "@/components/Footer.vue";
import Loader from "@/components/Loader.vue";
import Input from "@/components/Input.vue";
import Label from "@/components/Label.vue";
import Button from "@/components/Button.vue";
import StateSelect from "@/components/StateSelect.vue";

Vue.use(VeeValidate);

export default Vue.extend({
  components: { PageHeader, Footer, Loader, Input, Label, StateSelect, Button },
  data() {
    return {
      cart: JSON.parse(localStorage.getItem("cart") || "{}"),
      products: [],
      errorsGrouping: [],
      btnPressed: false,
      orderID: "",

      shippingMethod: "storePickup",

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
              isShippable
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

    orderByDelivery () {
      if (this.shippingMethod === "delivery") {
        return true;
      }
      return false;
    },

    formValid () {
      // loop over all contents of the fields object and check if they exist and valid.
      return Object.keys(this.fields).every(field => {
        return this.fields[field] && this.fields[field].valid;
      });
    },

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

    orderIsDeliverable (): boolean {
       return !this.products.some(this.checkShippable);
    },
  },

  methods: {

    checkShippable(product) {
      return !product.isShippable;
    },

    createOrder() {
      this.$apollo
        .mutate({
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
              products: { create: this.orderProducts },
              customer: { create: this.customerInfo },
              shippingAddress: { create: this.shippingInfo },
              billingAddress: { create: this.billingInfo },
              payment: { create: this.paymentInfo },
              subtotal: this.subtotal,
              tax: this.tax,
              total: this.total,
            },
          },
        })
        .then(data => {
          this.orderID = data.data.createOrder.id;

          this.$router.push({ path: `/confirmation/${this.orderID}` });
        });
    },

    submitForm() {
      this.btnPressed = true;
      this.errorsGrouping = [];

      const formApproved = this.formValid;

      if (formApproved) {
        this.products.forEach(product => {
          // Creating OrderProduct objects for Order
          const orderProduct = {
            title: product.title,
            imageURL: product.imageURL,
            description: product.description,
            price: product.price,
            quantity: this.cart[product.id],
          };

          this.orderProducts.push(orderProduct);

          // Inventory Adjustment For Purchased Products
          this.$apollo.mutate({
            // Mutation
            mutation: gql`
              mutation($data: ProductUpdateInput!, $id: ID!) {
                updateProduct(data: $data, where: { id: $id }) {
                  id
                  stock
                }
              }
            `,
            variables: {
              data: {
                stock: product.stock - this.cart[product.id],
              },
              id: product.id,
            },
          });
        });

        // Get Form Input

        this.customerInfo = {
          name: this.contactFirstName + " " + this.contactLastName,
          email: this.contactEmail,
        };
        this.shippingInfo = {
          name: this.shippingFirstName + " " + this.shippingLastName,
          line1: this.shippingAddress,
          line2: " ",
          city: this.shippingCity,
          state: this.shippingState,
          zip: this.shippingZip,
        };

        this.billingInfo = {
          name: this.billingFirstName + this.billingLastName,
          line1: this.billingAddress,
          line2: " ",
          city: this.billingCity,
          state: this.billingState,
          zip: this.billingZip,
        };

        this.paymentInfo = {
          name: this.billingFirstName + this.billingLastName,
          number: this.creditCardNumber,
          expDate: this.creditCardExpDate,
          cvv: this.creditCardCVV,
        };

        // Clear cart when making purchase
        const newCart = {};
        localStorage.setItem("cart", JSON.stringify(newCart));

        this.createOrder();
      }
    },
  },
});
</script>
