<template>
  <router-link :to="{ name: 'lesson', params: { id: lesson.id }}"
               v-slot="{href, route, navigate, isActive, isExactActive}"
    >
    <li class="nav-item">
      <a :href="href"
         class="nav-link"
         @click="updateCurrentLesson({id: lesson.id})"
         >
        {{ lesson.title }}
      </a>
    </li>
  </router-link>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'Lesson',
  props: ['lesson'],
  methods: {
    ...mapActions('lesson', ['updateCurrentLesson']),
  }
}
</script>

<style lang="sass">
.sidebar .nav-link
  font-weight: 500
  color: #333

  &.active, &:hover
    color: #999
</style>
