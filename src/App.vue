<template>
  <div id="app">
    <NavBar>
      <Login></Login>
    </NavBar>

    <button v-on:click="fetchTranslations">
      kek
    </button>

    <ul v-for="translation in translations" v-bind:key="translation.id">
      <Translation v-bind:translation="translation"></Translation>
    </ul>
  </div>
</template>

<script>
import Translation from './components/Translation.vue'
import NavBar from './components/nav/NavBar.vue'
import Login from './components/Login.vue'
import axios from 'axios'

function fetchTranslations() {
  axios
  .get('http://coincoin.me/duolingros/api/translations')
  .then((response) => window.console.log(response))
}

export default {
  name: 'app',
  data() {
    return {
      translations: [],
    };
  },
  components: {
    Translation,
    NavBar,
    Login,
  },
  methods: {
    fetchTranslations,
  }
}
</script>

