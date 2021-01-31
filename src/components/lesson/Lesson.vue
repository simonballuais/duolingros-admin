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

      <Button class="btn btn-outline-danger btn-sm remove-lesson"
              @click="deleteLesson({id: lesson.id})"
              spinWhenClicked
              requiresConfirmation
              small
              >
        <font-awesome-icon icon="trash" />
      </Button>
    </li>
  </router-link>
</template>

<script>
import {mapActions} from 'vuex'
import Button from '../form/Button'

export default {
  components: {
    Button,
  },
  name: 'Lesson',
  props: ['lesson'],
  methods: {
    ...mapActions(
      'lesson',
      [
        'deleteLesson',
      ]
    ),
  },
}
</script>

<style lang="sass">
.sidebar .nav-link
  display: inline-block
  font-weight: 500
  color: #343
  padding: 4px 0 0 16px

  &.active, &:hover
    color: #999

.nav-item
  button.remove-lesson
    display: none
    position: absolute
    right: 10px

  &:hover
    button.remove-lesson
      display: inline-block
</style>
