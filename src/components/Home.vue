<template>
  <div class="container-fluid">
    <SideMenu :title="'Lessons'" />

    <div class="row">
      <main class="col-md-12" role="main">
        <LessonDetails v-if="currentLesson" />

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

import LessonDetails from './lesson/LessonDetails'
import SideMenu from './nav/SideMenu'
import Spinner from './misc/Spinner'

export default {
  name: 'Home',
  props: ['id'],
  components: {
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
  padding-left: 510px

main
  min-height: 500px
</style>
