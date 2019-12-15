<template>
  <ul class="nav flex-column">
    <Lesson v-for="lesson in lessons"
            :key="lesson.id"
            :lesson="lesson">
    </Lesson>
  </ul>
</template>

<script>
import {mapState, mapActions} from 'vuex'

import Lesson from './Lesson'

export default {
  name: 'LessonList',
  components: {
    Lesson,
  },
  computed: {
    ...mapState('lesson', ['lessons']),
  },
  methods: {
    ...mapActions('lesson', ['getLessons']),
  },
  created() {
    this.getLessons()
  }
}
</script>
