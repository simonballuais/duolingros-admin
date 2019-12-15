<template>
  <div class="container-fluid">
    <div class="row">
      <SideMenu :title="'Lessons'">
        <LessonList></LessonList>
      </SideMenu>

      <LessonDetails v-if="currentLesson"
                     :lesson="currentLesson">
      </LessonDetails>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

import LessonList from './lesson/List'
import LessonDetails from './lesson/LessonDetails'
import SideMenu from './nav/SideMenu'

export default {
  name: 'Home',
  props: ['id'],
  components: {
    LessonList,
    SideMenu,
    LessonDetails,
  },
  computed: {
    ...mapState('lesson', ['currentLesson']),
  },
  methods: {
    ...mapActions('lesson', ['updateCurrentLesson']),
  },
  created() {
    if (!this.currentLesson) {
      this.updateCurrentLesson({ id: this.id })
    }
  },
  watch: {
    id() {
      this.updateCurrentLesson({ id: this.id })
    }
  }
}
</script>
