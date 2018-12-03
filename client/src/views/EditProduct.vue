<template>
 <div>
   <PageHeader> Item </PageHeader>
   <div v-if="$apollo.loading" class="my-20 text-center"><Loader /></div>
   <div class="w-4/5 mt-10 mx-auto py-8 px-6" v-else>
     <EditProductForm :formDefault="this.product" :submitFunction="updateProduct" v-if="product"></EditProductForm>
     <EditProductForm :formDefault="this.productEmpty" :submitFunction="createProduct" v-else></EditProductForm>  

     <div class="container mx-auto text-center">
       <Button @click.native="deleteProduct" v-if="product">Delete Item</Button>
     </div>
   </div>
 </div>
</template>

<script lang="ts">
import gql from "graphql-tag";
import Vue from "vue";
import PageHeader from "@/components/PageHeader.vue";
import Button from "@/components/Button.vue";
import EditProductForm from "@/components/EditProductForm.vue";
import Loader from "@/components/Loader.vue";
import PRODUCT from "@/graphql/Product.gql";
import PRODUCTS from "@/graphql/Products.gql";

export default Vue.extend({
 components: { PageHeader, Button, EditProductForm, Loader },
 data() {
   return {
     product: null,
     productEmpty: {
       stock: 0,
       title: "",
       description: "",
       imageURL: "",
       price: 0
     }
   };
 },
 apollo: {
   product() {
     return {
       query: PRODUCT,
       variables: { id: this.$route.params.id }
       }
    
   },
 },
 methods: {
   deleteProduct() {
     this.$apollo.mutate({
       mutation: gql`
         mutation($id: ID!) {
           deleteProduct(where: { id: $id }) {
             id
           }
         }
       `,
     variables: { id: this.$route.params.id },
     update: (store, { data:{ deleteProduct }}: any) => {
       // Read the data from our cache for this query.
       const data: any = store.readQuery({ query: PRODUCTS });
       // Deletes the product from the cache.
       if (data) {
          const index = data.products.findIndex((product: any) => product.id === deleteProduct.id);
          data.products.splice(index, 1);
         }

      // Writes the updated query to the cache.
       store.writeQuery({ query: PRODUCTS, data});
     }
     });
     this.$router.push({ path: "/admin/inventory" });
   },
   createProduct() {
     this.$apollo.mutate({
       // Mutation
       mutation: gql`
         mutation($data: ProductCreateInput!) {
           createProduct(data: $data) {
             id
             imageURL
             title
             description
             price
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
           imageURL: this.productEmpty.imageURL,
           title: this.productEmpty.title,
           description: this.productEmpty.description,
           price: this.productEmpty.price,
           stock: this.productEmpty.stock,        
       }
     },
     update: (store, { data: { createProduct } }: any) => {
       // Read the data from our cache for this query.
       const data: any = store.readQuery({ query: PRODUCTS });
       if (data) {
        data.products.push(createProduct);        
      }

       // Write our data back to the cache.
       store.writeQuery({ query: PRODUCTS, data });
       }
     });
     this.$router.push({ path: "/admin/inventory" });
   },
   updateProduct(): any {
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

         id: this.product.id
       },
       update: (store, { data: { updateProduct } }: any) => {
         // Read the data from our cache for this query.
         const data: any = store.readQuery({ query: PRODUCTS });
         // console.log(store.readQuery({query: PRODUCTS}));
         if (data) {
          const index = data.products.findIndex((product: any) => product.id === updateProduct.id);
          data.products[index] = updateProduct;
         }

         // Write our data back to the cache.
         store.writeQuery({ query: PRODUCTS, data });
       },
     })
     this.$router.push({ path: "/admin/inventory"});
   }
 },
});
</script>
