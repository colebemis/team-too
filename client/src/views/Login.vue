<template>
  <div>
    <PageHeader>Login</PageHeader>
    <div class="max-w-xs mx-auto mt-16 mb-24">
      <div
        v-if="isLoggedIn"
        class="p-4 text-black text-center leading-normal bg-grey-lightest"
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
            <label for="email" class="inline-block font-semibold mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              v-model="email"
              placeholder="bill@example.com"
              class="w-full p-3 border border-grey"
              required
            />
          </div>
          <div>
            <label for="password" class="inline-block font-semibold mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              v-model="password"
              placeholder="•••••"
              class="w-full p-3 border border-grey"
              required
            />
          </div>
          <div class="flex flex-col items-stretch mt-12">
            <Button data-test-id="login-button">Log in</Button>
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
import { onLogin } from "../vue-apollo";

export default Vue.extend({
  components: { PageHeader, Button },
  data() {
    return {
      error: null,
      email: "",
      password: "",
    };
  },
  computed: {
    isLoggedIn() {
      return (
        Boolean(localStorage.getItem("user")) &&
        Boolean(localStorage.getItem("apollo-token"))
      );
    },
  },
  methods: {
    logIn(event) {
      event.preventDefault();
      this.$apollo
        .mutate({
          mutation: gql`
            mutation logIn($email: String!, $password: String!) {
              logIn(email: $email, password: $password) {
                token
                user {
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
        .then(data => {
          // Save user data in localStorage
          localStorage.setItem("user", JSON.stringify(data.data.logIn.user));
          // Apollo will save the token and use it to authorize all future requests
          onLogin(this.$apollo.provider.defaultClient, data.data.logIn.token);
          // Redirect to homepage
          this.$router.push("/");
        })
        .catch(error => (this.error = error));
    },
  },
});
</script>
