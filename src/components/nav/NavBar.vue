<template>
  <header>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <Links></Links>
      <slot></slot>
      <span v-if="user" class="navbar-text">
        Coucou {{ user.username }}
      </span>
    </nav>
  </header>
</template>

<script>
import {mapState} from 'vuex'

import Links from './Links.vue'

export default {
  name: 'NavBar',
  components: {
    Links,
  },
  computed: {
    ...mapState('security', ['user']),
  },
}
</script>

<style lang="sass">
nav.navbar
  box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15)
</style>
