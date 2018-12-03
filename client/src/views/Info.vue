<template>
  <div>
      <PageHeader>Edit Home</PageHeader>
      <form class="mb-5" @submit.prevent="submitFunction">
        <div class="mt-6 mb-3">
          <label
            for="about"
            class="block mb-3 md:inline-block md:mr-5 md:w-2/5 md:text-right font-semibold text-xl"
            >About</label
          >
          <input
            type="text"
            id="about"
            v-model="siteInfo.about"
            class="border border-black p-2 mr-5 min-w-0"
            required
          />
        </div>

        <div class="mb-3">
          <label
            for="services"
            class="block mb-3 md:inline-block md:mr-5 md:w-2/5 md:text-right font-semibold text-xl"
            >Services</label
          >
          <div 
            v-for="(service, index) in siteInfo.services" 
            :key="service.id"
            class="flex flex-col justify-center"
          >
            <input
              type="text"
              id="service"
              v-model="siteInfo.services[index]"
              class="border border-black p-2 my-1 w-64"
              required
            />
          </div>
        </div>

        <div class="mb-3">
          <label
            for="phone"
            class="block mb-3 md:inline-block md:mr-5 md:w-2/5 md:text-right font-semibold text-xl"
            >Phone Number</label
          >
          <input
            type="text"
            id="phone"
            v-model="siteInfo.phone"
            class="border border-black p-2"
            required
          />
        </div>

        <div class="mb-3">
          <label
            for="email"
            class="block mb-3 md:inline-block md:mr-5 md:w-2/5 md:text-right font-semibold text-xl"
            >Email</label
          >
          <input
            type="text"
            id="email"
            v-model="siteInfo.email"
            class="border border-black p-2"
            required
          />
        </div>

        <div class="mb-3">
          <div 
            v-for="(hour, index) in siteInfo.hours" 
            :key="hour.id"
            class="flex flex-row md:flex-col"
          >
            <input
              type="text"
              id="day"
              v-model="siteInfo.hours[index].day"
              class="border border-black p-2"
              required
            />
            <input
              type="text"
              id="open"
              v-model="siteInfo.hours[index].open"
              class="border border-black p-2"
              required
            />
            <input
              type="text"
              id="close"
              v-model="siteInfo.hours[index].close"
              class="border border-black p-2"
              required
            />
          </div>
        </div>

        <div class="mb-3 flex flex-col">
          <label
            for="address"
            class="block mb-3 md:inline-block md:mr-5 md:w-2/5 md:text-right font-semibold text-xl"
            >Address</label
          >
          <input
            type="text"
            id="address"
            v-model="siteInfo.address.line1"
            class="border border-black py-2 w-10"
            required
          />
          <input
            type="text"
            id="address"
            v-model="siteInfo.address.line2"
            class="border border-black py-2"
            required
          />
          <input
            type="text"
            id="address"
            v-model="siteInfo.address.city"
            class="border border-black py-2"
            required
          />
          <input
            type="text"
            id="address"
            v-model="siteInfo.address.state"
            class="border border-black py-2"
            required
          />
          <input
            type="text"
            id="address"
            v-model="siteInfo.address.zip"
            class="border border-black py-2"
            required
          />
        </div>
     </form>
  </div>
</template>

<script lang="ts">
import gql from "graphql-tag";
import Vue from "vue";
import PageHeader from "@/components/PageHeader.vue";
import SITEINFO from "@/graphql/SiteInfo.gql";

export default Vue.extend({
  components: { PageHeader },
  data() {
    return {
      siteInfo: null
    };
  },
  apollo: {
    siteInfo() {
      return {
        query: SITEINFO
      }
    }
  },
});
</script>