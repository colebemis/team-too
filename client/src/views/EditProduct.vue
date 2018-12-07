<template>
 <div>
   <PageHeader> Edit Product </PageHeader>
   <div v-if="$apollo.loading" class="my-20 text-center"><Loader /></div>
   <div class="w-4/5 mt-10 mx-auto py-8 px-6" v-else>
     <EditProductForm 
     :formDefault="this.product" 
     :categoryProp="this.categories"
     v-if="product" 
     @submit-form="updateProduct"></EditProductForm>

     <EditProductForm 
     :formDefault="this.productEmpty" 
     :categoryProp="this.categories" 
     @submit-form="createProduct"
     v-else></EditProductForm>  
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
       categories: [],
       isShippable: false
     },
     addCategory: "",
     categories: null,
     newCategories: []
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
   computeCategories(ogCategories, selectedCategories, newCategories) {
      var connected = [];
      var disconnected = []; 
      var created = [];
      for (var i = 0; i < this.categories.length; i++) {
        var currentCategory = this.categories[i].name;
        if (ogCategories.includes(currentCategory)) {
          if (selectedCategories.includes(currentCategory)) {
            connected.push({id: this.categories[i].id});
          }
          else
          {
            disconnected.push({id: this.categories[i].id});
          }
        }
        else {
          if (selectedCategories.includes(currentCategory)) {
            connected.push({id: this.categories[i].id});
          }
        }
      }

      newCategories.forEach(category =>
      {
        created.push({name: category});
      });
      return {connect: connected, disconnect: disconnected, create: created};
   },
   deleteCategory(categoryID) {
     this.$apollo.mutate({
       mutation: gql`
        mutation($id: ID!) {
          deleteCategory(where: { id: $id }) {
             id
           }
         }
       `,
       variables: { id: categoryID },
        update: (store, { data:{ deleteCategory }}: any) => {
          // Read the data from our cache for this query.
          const data: any = store.readQuery({ query: CATEGORIES });
          // Deletes the product from the cache.
          if (data) {
              const index = data.categories.findIndex((category: any) => category.id === deleteCategory.id);
              data.categories.splice(index, 1);
            }

          // Writes the updated query to the cache.
          store.writeQuery({ query: CATEGORIES, data});
        }
        });       
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
  //  createCategory(categoryName): any {
  //     this.$apollo.mutate({
  //       // Mutation
  //       mutation: gql`
  //         mutation($data: CategoryCreateInput!) {
  //           createCategory(data: $data) {
  //             id
  //             name
  //             products {
  //               id
  //               createdAt
  //               updatedAt
  //               imageURL
  //               title
  //               description
  //               price
  //               stock
  //               isShippable
  //             }
  //           }
  //         }`,
  //         variables: {
  //           data: {
  //             name: categoryName
  //           }
  //         },
  //         update: (store, { data: { createCategory } }: any) => {
  //           // Read the data from our cache for this query.
  //           const data: any = store.readQuery({ query: CATEGORIES });
  //           if (data) {
  //             data.categories.push(createCategory);        
  //           }
  //           // Write our data back to the cache.
  //           store.writeQuery({ query: CATEGORIES, data });
  //           }
  //    }).then(data => {
  //      const resultingID = data.data.createCategory.id;
  //      this.newCategories.push({id: resultingID, name: categoryName});
  //  });
   createProduct(formChanges): any {
    // Begin by computing which categories changed.
     var categoryChanges = this.computeCategories(formChanges.categories[0], formChanges.categories[1], formChanges.categories[3]);
    // Create object format for "categories" in "data". 
     var categoryData = {
       create: categoryChanges.create,
       connect: categoryChanges.connect,
    };     
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
           imageURL: formChanges.product.imageURL,
           title: formChanges.product.title,
           description: formChanges.product.description,
           price: formChanges.product.price,
           stock: formChanges.product.stock,   
           categories: categoryData,
           isShippable: formChanges.product.isShippable
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
     }).then(() => {
    formChanges.categories[2].forEach((id) => 
                        this.deleteCategory(id));
   });
     this.$router.push({ path: "/admin/inventory" });
  },
   updateProduct(formChanges): any {
     // Begin by computing which categories changed.
     var categoryChanges = this.computeCategories(formChanges.categories[0], formChanges.categories[1], formChanges.categories[3]);
    // Create object format for "categories" in "data". 
     var categoryData = {
       create: categoryChanges.create,
       connect: categoryChanges.connect,
       disconnect: categoryChanges.disconnect,
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
           imageURL: formChanges.product.imageURL,
           title: formChanges.product.title,
           description: formChanges.product.description,
           price: formChanges.product.price,
           stock: formChanges.product.stock,
           categories: categoryData,
           isShippable: formChanges.product.isShippable
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
       },
   }).then((data) => {
     formChanges.categories[2].forEach((id) => 
                        this.deleteCategory(id));
   });

     this.$router.push({ path: "/admin/inventory"});
   }
 },
});
</script>
