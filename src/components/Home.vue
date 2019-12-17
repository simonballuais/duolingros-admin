<template>
  <div class="container-fluid">
    <div class="row">
      <SideMenu :title="'Lessons'">
        <LessonList></LessonList>
      </SideMenu>

      <main class="col-md-9" role="main">
        <LessonDetails v-if="currentLesson"
                       :lesson="currentLesson">
        </LessonDetails>

        <Spinner v-if="!currentLesson"
                 :big="true"
                 :center="true"
        ></Spinner>
      </main>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

import LessonList from './lesson/List'
import LessonDetails from './lesson/LessonDetails'
import SideMenu from './nav/SideMenu'
import Spinner from './misc/Spinner'

export default {
  name: 'Home',
  props: ['id'],
  components: {
    LessonList,
    LessonDetails,
    SideMenu,
    Spinner,
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

<style lang="sass">
div.container-fluid
  padding-top: 48px
</style>
