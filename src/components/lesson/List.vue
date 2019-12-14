<template>
  <div>
    <h1>
      Lessons :
    </h1>

    <ul>
      <Lesson v-for="lesson in lessons"
              :key="lesson.id"
              :lesson="lesson">
      </Lesson>
    </ul>
  </div>
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
