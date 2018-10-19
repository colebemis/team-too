<template>
  <div id="app">
    <div id="nav">
      <header class="header">
        <p style="text-align:left;" class="large_font"> FOXCYCLE 
          <span style= "float:right;" class="small_font">
            <router-link to="/">HOME</router-link>
            <router-link to="/shop">SHOP</router-link>
          </span> 
        </p>
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
.large_font{
  padding-left: 30px;
	font-size: 25pt;
}

.small_font{
	font-size: 20pt;
  }

.header {
  padding: 10px;
  background: #1abc9c;
  color: white;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  padding: 10px;
  font-weight: bold;
  color: #00717394;
}

#nav a.router-link-exact-active {
  color: #004173;
}
</style>
