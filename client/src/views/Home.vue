<template>
  <div class="text-white">
    <div class="flex relative overflow-hidden flex-none py-1">
      <img
        class="w-full h-full"
        alt="Main photo"
        src="http://s7d2.scene7.com/is/image/smithoptics/overtakeBackground-0?$cmsFull$"
      />
      <h1
        class="py-24 mx-16 text-right lg:text-6xl md:text-5xl text-3xl font-normal uppercase absolute pin-x pin-t"
      >
        Find your ride.
      </h1>
    </div>

    <div class="flex h-80 mb-1  overflow-hidden">
       <div
        class="flex w-1/3 flex-none items-center justify-center bg-cover  mr-1"
        style="background-image: url(http://wallpaperhd.online/upload/images/1527038205118/nature-forest-wallpaper-hd-night-forest-images-night-forest-wallpaper-light-cloud-1280x800.jpg)"
      >
        <h1
          class="lg:text-6xl sm:text-3xl text-lg font-normal text-center uppercase"
        >
          About
        </h1>
      </div>
      <div
        class="flex w-2/3 flex-none items-center justify-center lg:px-24 px-16 bg-cover"
        style="background-image: url(https://wallpaperaccess.com/full/420374.jpg)"
      >
        <div v-if="$apollo.loading" class="my-20 text-center"><Loader /></div>
        <p
          class="lg:text-lg text-sm text-center leading-normal font-semibold"
          v-else
        >
         {{siteInfo.about}}
        </p>
      </div>
    </div>

    <div class="flex h-80 mb-1 overflow-hidden">
      <div
        class="flex w-2/3 flex-none items-center justify-center mr-1 lg:px-24 px-16 bg-cover"
        style="background-image: url(https://images.unsplash.com/photo-1496147539180-13929f8aa03a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2428df044d72f0be9086d83b8c90f0b6&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb)"
      >
        <div v-if="$apollo.loading" class="my-20 text-center"><Loader /></div>
        <p
          class=" lg:text-lg text-sm text-center leading-normal font-semibold"
          v-else
        >
          We offer various services for your convenience:<br />
          <ul class="list-reset" v-for="service in siteInfo.services">
            <li>{{service}}</li>
          </ul>
        </p>
      </div>
      <div
        class="flex w-1/3 flex-none items-center justify-center bg-cover"
        style="background-image: url(https://images.triumphmotorcycles.co.uk/media-library/images/bikes/mountain%20bike/1920x1080-mountain-bike-background.jpg)"
      >
        <h1
          class="lg:text-6xl sm:text-3xl text-lg font-normal text-center uppercase"
        >
          Services
        </h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import gql from "graphql-tag";
import Vue from "vue";
import Loader from "@/components/Loader.vue";
import SITEINFO from "@/graphql/SiteInfo.gql";

export default Vue.extend({
  components: { Loader },
  data() {
    return {
      siteInfo: null,
    };
  },
  apollo: {
    siteInfo() {
      return {
        query: SITEINFO,
        }
    },
  },
});
</script>
