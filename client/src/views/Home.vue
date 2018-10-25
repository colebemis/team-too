<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="FOXYCLE"/>

    <!-- Apollo watched Graphql query -->
    <ApolloQuery
      :query="require('../graphql/Users.gql')"
    >
      <template slot-scope="{ result: { loading, error, data } }">

        <!-- Result -->
        <div v-for="user of data.users" :key="user.name" class="result apollo">{{ user.name}}</div>

      </template>
    </ApolloQuery>

    <el-button>Default</el-button>
  </div>


</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default Vue.extend({
  name: 'home',
  components: {
    HelloWorld,
  },
});
</script>
