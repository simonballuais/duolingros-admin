<template>
  <router-link :to="{ name: 'lesson', params: { id: lesson.id }}"
               v-slot="{href, route, navigate, isActive, isExactActive}"
    >
    <li class="nav-item">
      <a :href="href"
         class="nav-link"
         >
        {{ lesson.title }}
      </a>
    </li>
  </router-link>
</template>

<script>
export default {
  name: 'Lesson',
  props: ['lesson'],
}
</script>

<style lang="sass">
.sidebar .nav-link
  font-weight: 500
  color: #343
  padding: 4px 0 0 16px

  &.active, &:hover
    color: #999
</style>
