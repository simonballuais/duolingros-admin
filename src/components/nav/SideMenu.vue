<template>
  <nav class="col-md-2 bg-light sidebar">
    <div class="sidebar-sticky">
      <h1 class="sidebar-heading">
        {{ title }}
      </h1>
    </div>
    <slot></slot>
  </nav>
</template>

<script>
export default {
  name: 'SideMenu',
  props: ['title'],
}
</script>

<style lang="sass">
.sidebar
  position: fixed
  top: 0
  bottom: 0
  left: 0
  z-index: 100
  padding: 18px 0 0
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1)

.sidebar-sticky
  position: relative
  top: 0
  height: calc(100vh - 48 px)
  padding-top: .5rem
  overflow-x: hidden
  overflow-y: auto

.sidebar-heading
  font-size: .75rem
  text-transform: uppercase
</style>
