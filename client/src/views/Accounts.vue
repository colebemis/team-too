<template>
  <div>
    <h1>Accounts</h1>
    <div v-for="user in users" :key="user.id">{{ user.name }}</div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
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
        }
      }
    `,
  },
};
</script>
