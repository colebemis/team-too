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
          :id="user.email"
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
              @change="updateIsAdmin(user.id, $event.target.checked);"
              type="checkbox"
              :id="`is-admin-${user.id}`"
              :name="`is-admin-${user.id}`"
              v-model="user.isAdmin"
            />
            <label :for="`is-admin-${user.id}`" class="ml-2 mr-6">Admin</label>
            <button
              data-test-id="delete"
              @click="deleteUser(user.id);"
              class="px-3 py-2 text-sm bg-grey-light hover:bg-red hover:text-white"
            >
              Delete
            </button>
          </div>
          <div v-else class="text-grey-dark">(You)</div>
        </div>
      </div>
      <div class="mt-6 bg-grey-lightest p-6">
        <form @submit.prevent="createUser">
          <div class="mb-8">
            <label for="name" class="inline-block font-semibold mb-2">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              v-model="newUser.name"
              placeholder="Bill Nye"
              class="w-full p-3 border border-grey"
              required
            />
          </div>
          <div class="mb-8">
            <label for="email" class="inline-block font-semibold mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              v-model="newUser.email"
              placeholder="bill@example.com"
              class="w-full p-3 border border-grey"
              required
            />
          </div>
          <div class="mb-8">
            <label for="password" class="inline-block font-semibold mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              v-model="newUser.password"
              placeholder="•••••"
              class="w-full p-3 border border-grey"
              required
            />
          </div>
          <div class="mb-8">
            <input
              type="checkbox"
              id="is-admin"
              name="is-admin"
              v-model="newUser.isAdmin"
            />
            <label for="is-admin" class="ml-2 mr-6">Admin</label>
          </div>
          <div class="flex flex-col items-stretch">
            <Button data-test-id="create-account">Create account</Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import gql from "graphql-tag";
import Vue from "vue";
import PageHeader from "@/components/PageHeader.vue";
import Loader from "@/components/Loader.vue";
import Button from "@/components/Button.vue";
import { getUser } from "../auth";

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
  components: { PageHeader, Loader, Button },
  data() {
    return {
      users: [],
      currentUser: null,
      newUser: {
        name: "",
        email: "",
        password: "",
        isAdmin: false,
      },
    };
  },
  mounted() {
    this.currentUser = getUser();
    
  },
  apollo: {
    users: USERS,
  },
  methods: {
    deleteUser(userId: string) {
      this.$apollo.mutate({
        mutation: gql`
          mutation ($userId: ID!) {
            deleteUser(where: { id: $userId }) {
              id
            }
          }
        `,
        variables: { userId },
        update: (store, { data: { deleteUser } }: any) => {
          // Read the data from our cache for this query.
          const data: any = store.readQuery({ query: USERS });
          // Deletes the user from the cache.
          if (data) {
            const index = data.users.findIndex((user: {id: string}) => user.id === deleteUser.id);
            data.users.splice(index, 1);
          }

          // Writes the updated query to the cache.
          store.writeQuery({ query: USERS, data });
        },
      });
    },
    updateIsAdmin(userId: string, isAdmin: boolean) {
      this.$apollo.mutate({
        mutation: gql`
          mutation ($userId: ID!, $isAdmin: Boolean!) {
            updateUser(data: { isAdmin: $isAdmin }, where: { id: $userId }) {
              id
              isAdmin
            }
          }
        `,
        variables: { userId, isAdmin },
      });
    },
    createUser() {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation ($data: UserCreateInput!) {
              createUser(data: $data) {
                user {
                  id
                  name
                  email
                  isAdmin
                }
              }
            }
          `,
          variables: { data: this.newUser },
          update: (store, { data: { createUser } }: any) => {
            // Read the data from our cache for this query.
            const data: any = store.readQuery({ query: USERS });
            // Adds the user to the cache.
            if (data) {
              data.users.push(createUser.user);
            }
            // Writes the updated query to the cache.
            store.writeQuery({ query: USERS, data });
          },
        })
        .then(() => {
          this.newUser = {
            name: "",
            email: "",
            password: "",
            isAdmin: false,
          };
        });
    }
  },
});
</script>
