<template>
      <form class="mb-5" @submit.prevent="$emit('submit-form', [originalCategories, selectedCategories])">
       <div class="mb-3">
         <label
           for="quantity"
           class="block mb-3 md:inline-block md:mr-5 md:w-2/5 md:text-right font-semibold text-xl"
           >Quantity</label
         >
         <input
           type="number"
           id="quantity"
           v-model.number="formDefault.stock"
           class="border border-black p-2 mr-5 min-w-0"
           required
        />
         <div class="inline-flex flex-row mt-5 md:mt-0" data-test-id="buttonDiv">
           <Button
             type="button"
             data-test-id="increaseQuantity"
             class="mr-1"
             @click.native="formDefault.stock = Number(formDefault.stock) + 1;"
           >
             +
           </Button>
           <Button type="button" data-test-id="decreaseQuantity" @click.native="formDefault.stock -= 1;">-</Button>
         </div>
       </div>
       <div class="mb-3">
         <label
           for="title"
           class="block mb-3 md:inline-block md:mr-5 md:w-2/5 md:text-right font-semibold text-xl"
           >Display Name</label
         >
         <input
           type="text"
           id="title"
           v-model="formDefault.title"
           class="border border-black p-2"
           required
        />
       </div>
       <div class="mb-3">
         <label
           for="price"
           class="block mb-3 md:inline-block md:mr-5 md:w-2/5 md:text-right font-semibold text-xl"
           >Price($)</label
         >
         <input
           type="number"
           id="price"
           step="0.01"
           v-model.number="formDefault.price"
           class="border border-black p-2"
           required
        />
       </div>
       <div class="mb-3">
         <label
           for="description"
           class="block mb-3 md:inline-block md:mr-5 md:w-2/5 md:text-right font-semibold text-xl"
           >Description</label
         >
         <textarea
           id="description"
           rows="5"
           cols="21"
           v-model="formDefault.description"
           class="border border-black md:align-top"
           required
         ></textarea>
       </div>
       <div class="mb-3">
         <label
           for="image"
           class="block mb-3 md:inline-block md:mr-5 md:w-2/5 md:text-right font-semibold text-xl"
           >Image</label
         >
         <input
           type="text"
           id="image"
           v-model="formDefault.imageURL"
           class="border border-black p-2"
           required
        />
       </div>
       <div class="mb-3">
        <label
          for="title"
          class="block mb-3 md:inline-block md:mr-2 md:w-2/5 md:text-right font-semibold text-xl align-top"
          >Categories</label
        >
        <div class="inline-block w-1/5 min-w-full md:min-w-0">
          <div class="my-2 md:ml-3" :key="category.id" v-for="category in categories">
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

          <!-- For newly-added categories.  -->
        <div class="my-2 md:ml-3" :key="category" v-for="category in newCategories">
          <input
            type="checkbox"
            class="checkbox hidden"
            :id="category + 'id'"
            :value="category"
            v-model="selectedCategories"
        />
          <label :for="category + 'id'" class="block flex flex-row justify-between">
            <span class="ml-2 leading-none">{{category}}</span>
            <div class="ml-auto">
              <Button class="ml-5 btn-small" type="button" :id="category" @click.native="removeCategory">x</Button>
            </div>
          </label>  
        </div>
        {{selectedCategories}}
        {{originalCategories}}
      </div>
      </div class="mb-3">
        <label
          for="addCat"
          class="block mb-3 md:inline-block md:mr-5 md:w-2/5 md:text-right font-semibold text-xl"
          >Add Category</label
        >
        <input 
         id="addCat"   
         type="text"
         :value="value"
         @input="$emit('input', $event.target.value)"
         class="border border-black p-2 mr-5">
         <Button type="button" @click.native="addNewCategory">+</Button>
      </div>
      
       <div class="mx-auto flex flex-row justify-center mt-10 md:mt-5">
         <Button class="mr-2" type="submit" data-test-id="submit">Save Item</Button>
         <Button type="button" @click.native="toInventory" data-test-id="cancel" formnovalidate>Cancel</Button>
       </div>
     </form>
</template>

<style scoped>

#app .btn-small {
  padding: 1px 4px;
}
.checkbox + label::before {
 content: "";
 display: inline-block;
 vertical-align: top;
 height: 16px;
 width: 16px;
 border: 1px solid black;
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

<script lang="ts">
import Button from "@/components/Button.vue";
import Vue from "vue";
import CATEGORIES from "@/graphql/Categories.gql";

export default Vue.extend({
 components: { Button },
 props: { formDefault: Object, value: String, newCategories: Array, categories: Array },
 data() {
   return {
      selectedCategories: this.formDefault.categories.map(category => category.name),
   }
 },
 methods: {
   toInventory() {
     this.$router.push("/admin/inventory");
   },
   addNewCategory() {
     if (this.value != "") {
      this.$emit('cat-added');
     }
   },
   removeCategory(event) {
    var index = this.selectedCategories.indexOf(event.currentTarget.id);
    this.selectedCategories.splice(index, 1);
    this.$emit('cat-removed', event.currentTarget.id);
   }
 },
 created() {
    this.originalCategories = this.formDefault.categories.map(category => category.name);
 },
});
</script>