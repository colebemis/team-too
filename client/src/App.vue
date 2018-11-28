<template>
  <div id="app" class="font-sans flex flex-col min-h-screen">
    <AdminHeader />
    <SiteHeader />
    <div class="flex-grow"><router-view /></div>
    <Footer />
  </div>
</template>

<script lang="ts">
import AdminHeader from "@/components/AdminHeader.vue";
import SiteHeader from "@/components/SiteHeader.vue";
import Footer from "@/components/Footer.vue";
import { getUser } from "./auth";

export default {
  components: { AdminHeader, SiteHeader, Footer },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Work+Sans:400,500,600,700");

body {
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  text-decoration: none;
}
</style>
