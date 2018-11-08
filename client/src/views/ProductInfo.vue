<template>
  <div>
    <ApolloQuery
      :query="require('../graphql/productInfo.gql')"
      :variables = "{ id }"
    >
      <template slot-scope="{ result: { loading, error, data } }">
        <!-- Result -->

        <!-- Two columns -->
        <div class="flex mb-4 mx-20">

          <div class="w-1/2 h-120">
              <img v-bind:src="data.product.imageURL" alt="bike" class="productImg">
          </div>

          <div class="w-1/2 bg-grey-light h-120">

              <h1 class = "mx-24 mt-10 text-5xl flex justify-start items-start pb-2 font-extrabold"> {{data.product.title}} </h1>

              <p class =  "mx-24 flex justify-start items-start text-xl pb-5 font-light"> ${{data.product.price}} </p>

              <p class =  "mx-24 flex justify-start text-left text-xl italic font-medium"> 
                  {{data.product.description}} This bike is lit as shit and runs like a horse in the dirt of the swamp like a racehorse in the storm, without any lack of speed. This powerful mammoth by the famed corporate corporation will never let you down in the roughest of freeways and trails. What a guy. Thanks.
              </p> 


              <!-- Two columns -->
             <div class="flex flex-end mt-20 relative pin-b">

                 <div class="w-1/2 bg-blue-light h-12">
                   <p class = "text-xl mt-3 font-light"> {{data.product.stock}} in stock </p> 
                </div>              
                
                <div class="w-1/2 bg-grey h-12">
                  <div class="flex mb-4">
                      <div class="w-1/2 bg-grey-light h-12">
                          <button class="bg-black hover:bg-blue-light text-grey-lightest font-bold mt-2 py-2 px-4 rounded inline-flex items-center mb-10">
                            <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
                            <span>Add to Cart</span>
                          </button>
                      </div>
                      <div class="w-1/2 bg-grey h-12">
                      </div>
                  </div>


                </div>

              </div>
          </div>
        </div>

      </template>


    </ApolloQuery>
      <p> Your product has an ID of {{productId}} </p>
    <button @click="addToCart"> Add to Cart</button>

  </div>

</template>



<style>
  div img.productImg {
    margin: 0;
    width: 75%;
    object-fit: contain;
  }

 

</style>


<script>

export default {
  name: 'productInfo',
  props: ['productId'],
  data: function() {
    return {
    id: {id: this.productId}
    }
  },
  methods: {
    addToCart() {
      const cart = JSON.parse(localStorage.getItem("cart") || "{}");

      if (this.productId in cart) {
        cart[this.productId] += 1;
      } else {
        cart[this.productId] = 1;
      }

      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }

  }

</script>
