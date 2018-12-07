<template>
    <form class="mb-5" @submit.prevent="$emit('submit-form', siteInfoCopy)">
    <div class="flex mt-6 mb-3 md:flex-row flex-col md:justify-start justify-center">
        <label
        for="about"
        class="block my-1 md:inline-block md:mr-5 md:w-2/5 md:text-right text-center font-semibold text-xl"
        >About</label
        >
        <textarea
        id="about"
        rows="5"
        cols="21"
        v-model="siteInfoCopy.about"
        class="border border-black md:align-top"
        required
        ></textarea>
    </div>

    <div class="flex mb-3 md:flex-row flex-col md:justify-start justify-center content-start">
        <label
        for="services"
        class="block my-2 md:inline-block md:mr-5 md:w-2/5 md:text-right text-center font-semibold text-xl"
        >Services</label
        >
        <div class="inline-flex flex-col">
            <div 
                v-for="(service, index) in siteInfoCopy.services" 
                :key="service.id"
            >
                <input
                    type="text"
                    id="service"
                    v-model="siteInfoCopy.services[index]"
                    class="border border-black p-2 my-2 w-full"
                    required
                />
            </div>
        </div>
        <Button
            type="button"
            data-test-id="addService"
            class="mx-1 h-10 my-2"
            @click.native="addService"
        >
            +
        </Button>
        <Button
            type="button"
            data-test-id="removeService"
            class="mx-1 h-10 my-2"
            @click.native="removeService"
        >
            -
        </Button>
        
    </div>

    <div class="flex mb-3 md:flex-row flex-col md:justify-start justify-center">
        <label
        for="phone"
        class="block my-1 md:inline-block md:mr-5 md:w-2/5 md:text-right text-center font-semibold text-xl "
        >Phone Number</label
        >
        <input
        type="text"
        id="phone"
        v-model="siteInfoCopy.phone"
        class="border border-black p-2"
        required
        />
    </div>

    <div class="flex mb-3 md:flex-row flex-col md:justify-start justify-center">
        <label
        for="email"
        class="block my-1 md:inline-block md:mr-5 md:w-2/5 md:text-right text-center font-semibold text-xl"
        >Email</label
        >
        <input
        type="text"
        id="email"
        v-model="siteInfoCopy.email"
        class="border border-black p-2"
        required
        />
    </div>

    <div class="flex mb-3 md:flex-row flex-col md:justify-start justify-center content-start">
        <label
        for="hours"
        class="block my-1 md:inline-block md:mr-5 md:w-2/5 md:text-right text-center font-semibold text-xl"
        >Hours</label
        >
        <div class="inline-flex flex-col">
        <div class="flex-row">
            <div 
            v-for="(hour, index) in siteInfoCopy.hours" 
            :key="hour.id"
            >
            <input
                type="text"
                id="day"
                v-model="siteInfoCopy.hours[index].day"
                class="border border-black lg:w-24 w-full p-2 mr-1 my-1"
                required
            />
            <input
                type="text"
                id="open"
                v-model="siteInfoCopy.hours[index].open"
                class="border border-black lg:w-24 w-full p-2 mr-1 my-1"
                required
            />
            <input
                type="text"
                id="close"
                v-model="siteInfoCopy.hours[index].close"
                class="border border-black lg:w-24 w-full p-2 mr-1 mt-1 lg:mb-1 mb-8"
                required
            />
            </div>
        </div>
        </div>
        <Button
            type="button"
            data-test-id="addHour"
            class="mx-1 h-10 mb-2"
            @click.native="addHour"
        >
            +
        </Button>
        <Button
            type="button"
            data-test-id="removeHour"
            class="mx-1 h-10 mb-2"
            @click.native="removeHour"
        >
            -
        </Button>
    </div>

    <div class="flex mb-3 md:flex-row flex-col">
        <label
        for="address"
        class="block my-1 md:inline-block md:mr-5 md:w-2/5 md:text-right text-center font-semibold text-xl"
        >Address</label
        >
        <div class="inline-flex flex-col">
        <input
            type="text"
            id="address"
            v-model="siteInfoCopy.address.line1"
            class="border border-black p-2 my-1"
            required
        />
        <input
            type="text"
            id="address"
            v-model="siteInfoCopy.address.line2"
            class="border border-black p-2 my-1"
            required
        />
        <input
            type="text"
            id="address"
            v-model="siteInfoCopy.address.city"
            class="border border-black p-2 my-1"
            required
        />
        <input
            type="text"
            id="address"
            v-model="siteInfoCopy.address.state"
            class="border border-black p-2 my-1"
            required
        />
        <input
            type="text"
            id="address"
            v-model="siteInfoCopy.address.zip"
            class="border border-black p-2 my-1"
            required
        />
        </div>
    </div>

    <div class="mx-auto flex flex-row justify-center mt-10 md:mt-5">
        <Button class="mr-2" type="submit" data-test-id="submit">Save Info</Button>
    </div>
    </form>
</template>

<script lang="ts">
import gql from "graphql-tag";
import Vue from "vue";
import Button from "@/components/Button.vue";
import PageHeader from "@/components/PageHeader.vue";
import cloneDeep from "lodash.clonedeep";
import SITEINFO from "@/graphql/SiteInfo.gql";

export default Vue.extend({
  components: { PageHeader, Button },
  props: { submitFunction: Function, siteInfo: Object, updates: Object},
  data() {
    return {
        siteInfoCopy: cloneDeep(this.siteInfo)
    };
  },
  methods: {
   addService() {
       this.siteInfoCopy.services.push("");
   },
   removeService() {
       this.siteInfoCopy.services.pop();
   },
   addHour() {
       const hour = {
           index: this.siteInfoCopy.hours.length,
           day: "",
           open: "",
           close: ""
      }
      this.siteInfoCopy.hours.push(hour);
   },
   removeHour() {
       const hour = {
           id: this.siteInfoCopy.hours[this.siteInfoCopy.hours.length-1].id
       }
       this.updates.deleteHours.push(hour);
       this.siteInfoCopy.hours.pop();
   }
 },
});
</script>