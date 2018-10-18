<template>
  <div id="app">
    <div id="nav">
      <el-header>
        <router-link to="/">Home</router-link>
        <router-link to="/shop">Shop</router-link>
      </el-header>
      <el-container>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
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
.el-header, .el-footer {
    background-color: #fefbd8;
    color: red;
    text-align: center;
    line-height: 60px;
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
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
