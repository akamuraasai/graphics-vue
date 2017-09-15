<template>
  <div id="app">
    <menu-bar/>
    <router-view></router-view>
  </div>
</template>

<script>
import MenuBar from '@/components/Menu'

export default {
  components: {
    MenuBar
  },
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*color: #2c3e50;*/
  margin: 20px;
}
</style>
