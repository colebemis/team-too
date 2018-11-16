<template>
  <div id="app" class="font-sans">
    <SiteHeader />
    <router-view />
    <Footer />
  </div>
</template>

<script lang="ts">
import SiteHeader from "@/components/SiteHeader.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: { SiteHeader, Footer },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Work+Sans:400,600,700");

body {
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  text-decoration: none;
}
</style>
