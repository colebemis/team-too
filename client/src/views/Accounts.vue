<template>
  <div>
    <PageHeader>Accounts</PageHeader>
    <div v-if="$apollo.loading" class="my-20 text-center"><Loader /></div>
    <div v-else class="container mx-auto mb-16 px-4">
      <div class="py-10 text-grey-darker">{{ users.length }} accounts</div>
      <div class="bg-grey-lightest px-6">
        <div
          v-for="(user, index) in users"
          :key="user.id"
          :class="[index !== users.length - 1 && 'border-b', 'py-6']"
        >
          <div class="flex flex-col">
            <span class="leading-normal">{{ user.name }}</span>
            <span class="leading-normal text-sm text-grey-darker">{{
              user.email
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import gql from "graphql-tag";
import Vue from "vue";
import PageHeader from "@/components/PageHeader.vue";
import Loader from "@/components/Loader.vue";

export default Vue.extend({
  components: { PageHeader, Loader },
  data() {
    return {
      users: [],
    };
  },
  apollo: {
    users: gql`
      query users {
        users {
          id
          name
          email
        }
      }
    `,
  },
});
</script>
