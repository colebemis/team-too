<template>
       <form class="mb-5" @submit.prevent="updateProduct">
        <div class="mb-3">
          <label
            for="quantity"
            class="block mb-3 md:inline-block md:mr-5 md:w-2/5 md:text-right font-semibold text-xl"
            >Quantity</label
          >
          <input
            type="text"
            id="quantity"
            v-model="product.stock"
            class="border border-black p-2 mr-5 min-w-0"
          />
          <div class="inline-flex flex-row mt-5 md:mt-0">
            <Button
              type="button"
              class="mr-1"
              @click.native="product.stock = Number(product.stock) + 1;"
            >
              +
            </Button>
            <Button type="button" @click.native="product.stock -= 1;">-</Button>
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
            v-model="product.title"
            class="border border-black p-2"
          />
        </div>
        <div class="mb-3">
          <label
            for="title"
            class="block mb-3 md:inline-block md:mr-5 md:w-2/5 md:text-right font-semibold text-xl"
            >Price($)</label
          >
          <input
            type="text"
            :value="product.price"
            class="border border-black p-2"
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
            :value="product.description"
            class="border border-black md:align-top"
          ></textarea>
        </div>
        <div class="mb-3">
          <label
            for="title"
            class="block mb-3 md:inline-block md:mr-5 md:w-2/5 md:text-right font-semibold text-xl"
            >Image</label
          >
          <input
            type="text"
            :value="product.imageURL"
            class="border border-black p-2"
          />
        </div>
        <div class="mx-auto flex flex-row justify-center mt-10 md:mt-5">
          <Button class="mr-2" type="submit">Save Item</Button>

          <Button @click.native="returnToInventory">Cancel</Button>
        </div>
      </form>
</template>

<script>
import Button from "@/components/Button.vue";
export default {
  props: { 
      formDefault: {
         validator: prop => typeof prop === 'Object' || prop === null}
        }
}
</script>
