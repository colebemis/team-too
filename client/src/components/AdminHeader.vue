<template>
  <div
    v-if="user"
    data-test-id="admin-header"
    class="bg-black text-sm text-grey-light font-medium p-3 flex"
  >
    <span>Welcome, {{user.name}}</span>
    <div class="mx-auto" />
    <router-link to="/admin/orders" class="text-grey-light ml-5">
      Orders
    </router-link>
    <router-link to="/admin/inventory" class="text-grey-light ml-5">
      Inventory
    </router-link>
    <router-link
      v-if="user.isAdmin"
      to="/admin/accounts"
      class="text-grey-light ml-5"
    >
      Accounts
    </router-link>
    <button
      data-test-id="log-out"
      @click="logOut"
      class="text-grey-light ml-5 font-medium"
    >
      Log out
    </button>
  </div>
</template>

<script>
import Vue from "vue";
import { getUser, logOut } from "../auth";

export default Vue.extend({
  data() {
    return { user: null };
  },
  mounted() {
    this.user = getUser();
  },
  methods: {
    logOut() {
      logOut(this.$apollo.provider.defaultClient);
      // Redirect to Login page
      window.location = "/login";
    }
  }
})
</script>