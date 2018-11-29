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
          :class="[
            index !== users.length - 1 && 'border-b',
            'py-6 flex justify-between items-center',
          ]"
        >
          <div class="flex flex-col">
            <span class="leading-normal">{{ user.name }}</span>
            <span class="leading-normal text-sm text-grey-darker">{{
              user.email
            }}</span>
          </div>
          <!-- Only edit/delete other users -->
          <div v-if="currentUser.id !== user.id">
            <input
              @change="updateIsAdmin(user.id, $event.target.checked)"
              type="checkbox"
              id="is-admin"
              name="is-admin"
              v-model="user.isAdmin"
            >
            <label for="is-admin" class="ml-2 mr-6">Admin</label>
            <button
              @click="deleteUser(user.id);"
              class="px-3 py-2 text-sm bg-grey-light hover:bg-red hover:text-white"
            >
              Delete
            </button>
          </div>
          <div v-else class="text-grey-dark">(You)</div>
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

const USERS = gql`
  query users {
    users {
      id
      name
      email
      isAdmin
    }
  }
`;

export default Vue.extend({
  components: { PageHeader, Loader },
  data() {
    return {
      users: [],
      currentUser: null
    };
  },
  mounted() {
    // This will be replaced with a call to getUser() when my other pull is merged
    if (localStorage.getItem("user")) {
      this.currentUser = JSON.parse(localStorage.getItem("user"))
    }
  },
  apollo: {
    users: USERS,
  },
  methods: {
    deleteUser(userId: string) {
      this.$apollo.mutate({
        mutation: gql`
          mutation($userId: ID!) {
            deleteUser(where: { id: $userId }) {
              id
            }
          }
        `,
        variables: { userId },
        update: (store, { data: { deleteUser } }) => {
          // Read the data from our cache for this query.
          const data = store.readQuery({ query: USERS });
          // Deletes the user from the cache.
          const index = data.users.findIndex(user => user.id === deleteUser.id);
          data.users.splice(index, 1);
          // Writes the updated query to the cache.
          store.writeQuery({ query: USERS, data });
        },
      });
    },
    updateIsAdmin(userId: string, isAdmin: boolean) {
      this.$apollo.mutate({
       mutation: gql`
         mutation($userId: ID!, $isAdmin: Boolean!) {
           updateUser(data: { isAdmin: $isAdmin }, where: { id: $userId }) {
             id
             isAdmin
           }
         }
       `,
       variables: { userId, isAdmin },
      });
    }
  },
});
</script>
