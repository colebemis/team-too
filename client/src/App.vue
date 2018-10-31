<template>
  <div id="app">
    <div id="nav">
      <header class="header"> 
        <span style= "float:left;" class="small_font"><router-link to="/shop">SHOP</router-link></span>
        <span style= "float:center;" class="large_font"><router-link to="/">FOXCYCLE</router-link></span>
        <span style= "float:right;" class="small_font"><router-link to="/cart">CART</router-link></span> 
        <p style= "text-align:center;">EST 2018</p>
      </header>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
a:link {
    text-decoration: none;
}
p {
  margin-block-start: 0px;
  margin-block-end: 0px;
}

.large_font{
	font-size: 30pt;
}

.small_font{
	font-size: 20pt;
  }

.header {
  padding: 10px;
  background: white;
  color: black;
}

#app {
  font-family: 'Work sans', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
}

#nav {
  padding: 30px;
}

#nav a {
  padding: 10px;
  color: black;
}

#nav a.router-link-exact-active {
  color: black;
}
</style>
