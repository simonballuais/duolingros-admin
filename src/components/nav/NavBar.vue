<template>
  <header>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
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
