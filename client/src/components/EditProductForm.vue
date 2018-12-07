<template>
      <form class="mb-5" @submit.prevent="submitForm">
       <div class="mb-3">
         <label
           for="quantity"
           class="block mb-3 md:inline-block md:mr-5 md:w-2/5 md:text-right font-semibold text-xl"
           >Quantity</label
         >
          <input
            type="number"
            id="quantity"
            v-validate="'numeric|required'"
            name="quantity"
            v-model.number="form.stock"
            class="border border-black p-2 mr-5 min-w-0"
          />

         <div class="inline-flex flex-row mt-5 md:mt-0" data-test-id="buttonDiv">
           <Button
             type="button"
             data-test-id="increaseQuantity"
             class="mr-1"
             @click.native="form.stock = Number(form.stock) + 1;"
           >
             +
           </Button>
           <Button type="button" data-test-id="decreaseQuantity" @click.native="form.stock == 0 ? form.stock: form.stock -= 1">-</Button>
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
           name="title"
           v-validate="'required'"
           v-model="form.title"
           class="border border-black p-2"
        />
       </div>

       <!-- For Price  -->
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
           v-validate="'decimal:2|required'"
           name="price"
           v-model.number="form.price"
           class="border border-black p-2"
        />
       </div>

       <!-- For Description  -->
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
           name="description"
           v-validate="'required'"
           v-model="form.description"
           class="border border-black md:align-top"
         ></textarea>
       </div>

       <!-- For Image (URL)  -->
       <div class="mb-3">
         <label
           for="image"
           class="block mb-3 md:inline-block md:mr-5 md:w-2/5 md:text-right font-semibold text-xl"
           >Image</label
         >
         <input
           type="text"
           id="image"
           name="image"
           v-validate="'required'"
           v-model="form.imageURL"
           class="border border-black p-2"
        />
       </div>

       <!-- For Current Categories  -->
       <div>
        <label
          for="title"
          class="block mb-3 md:inline-block md:mr-2 md:w-2/5 md:text-right font-semibold text-xl align-top"
          >Categories</label
        >
        <div class="inline-block w-1/5 min-w-full md:min-w-0 max-w-xs">
          <div class="my-2 mb-6 md:ml-3" :key="category.id" :id="category.name" v-for="category in categories">
            <input
              type="checkbox"
              class="checkbox hidden"
              :id="category.name + 'id'"
              :value="category.name"
              v-model="selectedCategories"
              v-validate="'required'"
              name="category"
          />
            <label :for="category.name + 'id'" class="relative block flex flex-row justify-between max-w-xs">
            <span class="ml-2 leading-none">{{category.name}}</span>
            <div class="ml-auto flex-none">
              <Button class="ml-5 btn-small" type="button" :id="category.id" @click.native="removeCategory">x</Button>
            </div>
          </label>   
          </div>
      </div>
      </div>
          <!-- For Newly-added Categories.  -->
        <div class="mb-3" v-if="hasNewCategories">
        <div
           class="block mb-3 md:inline-block md:mr-2 md:w-2/5 md:text-right font-semibold text-xl align-top"
           >New Categories</div>
          <div class="inline-block w-1/5 min-w-full md:min-w-0">
        <div class="my-2 ml-3 mb-6 flex flex-row justify-between max-w-lg" :key="category" v-for="category in newCategories">
              <span class="leading-none">{{category}}</span>
              <div class="ml-auto">
                <Button class="btn-small" type="button" :id="category" @click.native="removeNewCategory">x</Button>
              </div>
        </div>  
          </div>
        </div>
      </div>
      </div class="mb-3">
        <label
          for="addCat"
          class="block mb-0 md:mb-3 md:inline-block md:mr-5 md:w-2/5 md:text-right font-semibold text-xl"
          >Add Category</label
        >
        <input 
         id="addCat"   
         type="text"
         v-model="addCategory"
         class="border border-black p-2 mr-5">
         <Button type="button" class="mt-5 md:mt-0" @click.native="addNewCategory">+</Button>
         <div v-if="cantAddCategory" class="flex justify-left md:justify-center text-red text-xs mt-2">
            <span class="px-5 py-3 inline-block bg-red-lightest"> There is already a category with this name. </span>
         </div>
      </div>
      <div class="mb-3 mt-2">
         <label
           for="title"
           class="block mb-3 md:inline-block md:mr-5 md:w-2/5 md:text-right font-semibold text-xl"
           >Can Be Delivered</label
         >
         <input
           type="checkbox"
           id="shippable"
           v-model="form.isShippable"
           class="checkbox hidden"
        />
          <label class="relative"
           for="shippable"
           ></label
         > 
      </div>

       <div class="mx-auto flex flex-row justify-left md:justify-center mt-10 md:mt-5">
         <Button class="mr-2" type="submit" data-test-id="submit">Save Item</Button>
         <Button type="button" @click.native="toInventory" data-test-id="cancel" formnovalidate>Cancel</Button>
       </div>
     </form>
</template>

<style scoped>
#app .btn-small {
  padding: 0.5px 3px;
}

.none {
  display: none;
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
import VeeValidate from "vee-validate";

Vue.use(VeeValidate);
export default Vue.extend({
 components: { Button },
 props: { formDefault: Object, categoryProp: Array },
 data() {
   return {
      form: {...this.formDefault},
      categories: [...this.categoryProp],
      selectedCategories: this.formDefault.categories.map(category => category.name),
      deletedCategories: [],
      newCategories: [],
      addCategory: "",
      cantAddCategory: false,

   }
 },
 computed: {
  hasNewCategories() {
    return this.newCategories.length > 0;
  },
  formValid() {
      // loop over all contents of the fields object and check if they exist and valid.
      return Object.keys(this.fields).every(field => {
        return this.fields[field] && this.fields[field].valid;
      });
   },
 },
 methods: {
   toInventory() {
     this.$router.push("/admin/inventory");
   },
   addNewCategory() {
     if (this.addCategory != "") {
       if (!this.newCategories.includes(this.addCategory) && 
       !this.categories.map(category => category.name).includes(this.addCategory)) {
        this.newCategories.push(this.addCategory);
        this.selectedCategories.push(this.addCategory);
        this.addCategory = "";
        this.cantAddCategory = false;
       }
       else {
        this.cantAddCategory = true;
       }
     }
   },
   removeCategory(event) { 
     // Confirmation window
     const remove = window.confirm("Removing this category will disconnect it"
     + " from every product. All changes will be finalized upon clicking 'Save Item'.");
     if (remove) {
     // Here, event.currentTarget.id is the the id of the category.
      const categories = this.categories.map(category => category.id);
      const indexCategories = categories.indexOf(event.currentTarget.id);
      const index = this.selectedCategories.indexOf(this.categories[indexCategories].name);
      if (index != -1) {
        this.selectedCategories.splice(index, 1);
      }
      // "Deletes" the category in categories.
      this.categories.splice(indexCategories, 1);
      this.deletedCategories.push(event.currentTarget.id);
      // this.$emit('cat-removed', event.currentTarget.id);
     }

   },
   removeNewCategory(event) {
    const index = this.selectedCategories.indexOf(event.currentTarget.id);
    if (index != -1) {
      this.selectedCategories.splice(index, 1);
    }
    this.newCategories.splice(this.newCategories.indexOf(event.currentTarget.id), 1);
    // this.$emit('cat-new-removed', event.currentTarget.id);
   },
   submitForm() {
     if (this.formValid) {
        this.$emit('submit-form', {product: this.form, categories: [this.originalCategories, this.selectedCategories,
                                                                    this.deletedCategories, this.newCategories]});
     }
   }
 },
 created() {
    this.originalCategories = this.formDefault.categories.map(category => category.name);
 },
});
</script>