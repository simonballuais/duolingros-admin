<template>
  <header>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <Links></Links>
      <slot></slot>
    </nav>
  </header>
</template>

<script>
import Links from './Links.vue'

export default {
  name: 'NavBar',
  components: {
    Links,
  },
}
</script>
