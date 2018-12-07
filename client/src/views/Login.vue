<template>
  <div>
    <PageHeader>Login</PageHeader>
    <div class="max-w-xs mx-auto mt-16 mb-24">
      <div
        v-if="isLoggedIn"
        data-test-id="logged-in"
        class="text-black text-center"
      >
        You are already logged in.
      </div>
      <div v-else>
        <div
          v-if="error"
          data-test-id="error"
          class="p-4 text-red-darker leading-normal bg-red-lightest mb-8"
        >
          {{ error.message }}
        </div>
        <form id="login-form" @submit="logIn">
          <div class="mb-8">
            <Label for="email">
              Email
            </Label>
            <Input
              :disabled="loading"
              id="email"
              name="email"
              type="email"
              v-model="email"
              placeholder="bill@example.com"
              required
            />
          </div>
          <div>
            <Label for="password">
              Password
            </label>
            <Input
              :disabled="loading"
              id="password"
              name="password"
              type="password"
              v-model="password"
              placeholder="•••••"
              required
            />
          </div>
          <div class="flex flex-col items-stretch mt-12">
            <Button data-test-id="login-button" :disabled="loading">
              <span v-if="loading">Loading...</span>
              <span v-else>Log in</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import gql from "graphql-tag";
import PageHeader from "@/components/PageHeader.vue";
import Button from "@/components/Button.vue";
import Label from "@/components/Label.vue";
import Input from "@/components/Input.vue";
import { logIn, isLoggedIn } from "../auth";

export default Vue.extend({
  components: { PageHeader, Button, Label, Input },
  data() {
    return {
      error: null,
      email: "",
      password: "",
      isLoggedIn: false,
      loading: false,
    };
  },
  mounted() {
    this.isLoggedIn = isLoggedIn();
  },
  methods: {
    logIn(event) {
      this.loading = true;
      event.preventDefault();
      this.$apollo
        .mutate({
          mutation: gql`
            mutation logIn($email: String!, $password: String!) {
              logIn(email: $email, password: $password) {
                token
                user {
                  id
                  name
                  email
                  isAdmin
                }
              }
            }
          `,
          variables: {
            email: this.email,
            password: this.password,
          },
        })
        .then(({ data }) => {
          logIn(
            data.logIn.token,
            data.logIn.user,
            this.$apollo.provider.defaultClient,
          );
          // Redirect to homepage
          window.location = "/";
          // We use window.location instead of $router.push to trigger a page refresh
          // so any components that use localStorage get updated
        })
        .catch(error => {
          this.loading= false;
          this.error = error;
        });
    },
  },
});
</script>
