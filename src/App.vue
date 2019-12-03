<template>
  <div id="app">
    <NavBar></NavBar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from './components/nav/NavBar.vue'

export default {
  name: 'app',
  components: {
    NavBar,
  },
}
</script>

