<template>
 <div>
   <PageHeader> Item </PageHeader>
   <div v-if="$apollo.loading" class="my-20 text-center"><Loader /></div>
   <div class="w-4/5 mt-10 mx-auto py-8 px-6" v-else>
     <EditProductForm 
     :formDefault="this.product" 
     :categories="this.categories"
     :newCategories="this.newCategories" 
     v-model="addCategory" 
     v-if="product" 
     @cat-added="addNewCategory" 
     @cat-removed="removeNewCategory"
     @submit-form="updateProduct"></EditProductForm>
     <EditProductForm :formDefault="this.productEmpty" :categories="this.categories" v-model="addCategory" @cat-added="addCategory" v-else></EditProductForm>  
     {{newCategories}}
     
     <div class="container mx-auto text-center">
       <Button @click.native="deleteProduct" v-if="product" data-test-id="delete">Delete Item</Button>
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
import CATEGORIES from "@/graphql/Categories.gql";
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
       price: 0,
       categories: []
     },
     addCategory: "",
     newCategories: [],
     categories: null
   };
 },
 apollo: {
   product() {
     return {
       query: PRODUCT,
       variables: { id: this.$route.params.id }
       }
    
   },
   categories() {
     return {
       query: CATEGORIES
     }
   }

 },
 methods: {
   addNewCategory() {
    this.newCategories.push(this.addCategory);
    this.addCategory = ""; 
   },
   removeNewCategory() {
    var index = this.newCategories.indexOf(event);
    this.newCategories.splice(index, 1);
   },
   computeCategories(ogCategories, selectedCategories) {
      var connected = [];
      var created = []; 
      var deleted = []; 
      for (var i = 0; i < this.categories.length; i++) {
        var currentCategory = this.categories[i].name;
        if (ogCategories.includes(currentCategory)) {
          if (selectedCategories.includes(currentCategory)) {
            connected.push({id: this.categories[i].id});
          }
          else
          {
            deleted.push({id: this.categories[i].id});
          }
        }
        else {
          if (selectedCategories.includes(currentCategory)) {
            connected.push({id: this.categories[i].id});
          }
        }
      } 
      this.newCategories.forEach(cat => created.push({name: cat}));
      return {connect: connected, delete: deleted, create: created};
   },
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
   updateProduct(categories): any {
     // Begin by computing which categories changed.
     var categoryChanges = this.computeCategories(categories[0], categories[1]);
    // Create object format for "categories" in "data". 
     var categoryData = {
       create: categoryChanges.create,
       connect: categoryChanges.connect,
       disconnect: categoryChanges.delete
    }     
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
               id
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
           categories: categoryData
         },

         id: this.product.id
       },
       update: (store, { data: { updateProduct } }: any) => {
         // Read the data from our cache for this query.
         const data: any = store.readQuery({ query: PRODUCTS });
         if (data) {
          const index = data.products.findIndex((product: any) => product.id === updateProduct.id);
          data.products[index] = updateProduct;
         }
         store.writeQuery({ query: PRODUCTS, data });

        // Read data from cache for categories query.
        const data2: any = store.readQuery({ query: CATEGORIES });
        // if (data2) {
        //   var cacheCategories = data2.categories.map(category => category.name);
        //   var addedCategories = updateProduct.categories.filter(category => {
        //     return !cacheCategories.includes(category.name);
        //   })
        //   for (var i = 0; i < addedCategories.length; i++) {
        //      data2.categories.push(addedCategories[i]);
        //    }

        store.writeQuery({ query: CATEGORIES, data2 });
        // console.log(data2);
        // }
         // Write our data back to the cache.
       },
     })
     this.$router.push({ path: "/admin/inventory"});
   }
 },
});
</script>
