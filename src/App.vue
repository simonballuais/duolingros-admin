<template>
  <div id="app">
    <NavBar>
    </NavBar>

    <div class="jumbotron">
      <div class="container">
        <div class="row">
          <div class="col-sm-6 offset-sm-3">
            <Login></Login>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from './components/nav/NavBar.vue'
import Login from './components/Login.vue'

export default {
  name: 'app',
  components: {
    NavBar,
    Login,
  },
}
</script>

