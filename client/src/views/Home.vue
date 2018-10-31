<template>
  <div class="home">
    <div class="main image">
      <img alt="Main photo" src="https://images.wallpaperscraft.com/image/peugeot_bike_sport_113690_3840x2160.jpg" width=100%>
      <h1>FIND YOUR RIDE.</h1>
      <h2>Unleash your cycling passion with our premium selection of bikes</h2>
    </div>
    <!-- <div class="about">
      <h1>
        <img align="left" alt="About photo" src="https://images.unsplash.com/photo-1521078803125-7efd09b65b8f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=27193ad9f55dfc8dc88d5c3b1ddf80c4&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb">
        About
        <p>Lorem ipsum netus sodales lacinia mi aenean proin feugiat donec suscipit tempus duis, praesent malesuada gravida aliquam maecenas curae ligula pretium suspendisse nisl. 
          Placerat lorem senectus sem aliquam non risus eu purus, sociosqu himenaeos venenatis augue class curabitur turpis fermentum mauris, euismod sapien aenean mauris donec vulputate faucibus enim curae felis ut etiam aptent nisl est in morbi.
          Donec malesuada lacinia est et velit commodo placerat, conubia nec facilisis class eros sollicitudin, erat tellus condimentum hendrerit vivamus netus.</p>
      </h1>
    </div>
    <div class="services">
      <h1>
        Services
        <p>Lorem ipsum netus sodales lacinia mi aenean proin feugiat donec suscipit tempus duis, praesent malesuada gravida aliquam maecenas curae ligula pretium suspendisse nisl. 
          Placerat lorem senectus sem aliquam non risus eu purus, sociosqu himenaeos venenatis augue class curabitur turpis fermentum mauris, euismod sapien aenean mauris donec vulputate faucibus enim curae felis ut etiam aptent nisl est in morbi.
          Donec malesuada lacinia est et velit commodo placerat, conubia nec facilisis class eros sollicitudin, erat tellus condimentum hendrerit vivamus netus.
        </p>
        <img align="right" alt="Service photo" src="http://www.felgen.no/wp-content/uploads/2016/03/pg-service-repair.jpg">
      </h1>
    </div> -->

    <!-- Apollo watched Graphql query -->
    <ApolloQuery
      :query="require('../graphql/Users.gql')"
      <template slot-scope="{ result: { loading, error, data } }">

        <!-- Result -->
        <div v-for="user of data.users" :key="user.name" class="result apollo">{{ user.name}}</div>

      </template>
    </ApolloQuery>
  </div>
</template>

<style>
  h1 {
      font-family: 'Work sans', 'Avenir', Helvetica, Arial, sans-serif;
      margin-block-end: 5px;
      margin-block-start: 30px;
      font-size: 70px;
  }

  h2 {
      font-family: 'Work sans', 'Avenir', Helvetica, Arial, sans-serif;
      margin-block-end: 0px;
      margin-block-start: 0px;
      font-weight: normal;
      font-size: 20px;
  }

  p {
      font-family: 'Work sans', 'Avenir', Helvetica, Arial, sans-serif;
      font-size: 20px;
  }
  .center-fit {
      width: 100%;
      height: auto;
      margin: auto;
  }
  .cropimg {
      max-width: 100%;
      max-height: 100vh;
      margin: auto;
      position: absolute;
      clip: rect(75px,0px,75px,0px);  
  }
</style>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'home',
});
</script>
