<template>
  <nav class="bg-light sidebar">
    <h1>
      Book lessons

      <Button class="btn btn-outline-success ml-1"
              @click="addBookLesson()"
              spinWhenClicked
              >
        <font-awesome-icon icon="plus" />
      </Button>

    </h1>
    <div v-for="bookLesson in bookLessons"
         :key="bookLesson.id"
         class="book-lesson"
         >
     <h2 href="#">
       <TextInput v-model="bookLesson.title"
                  @keyup="updateBookLessonTitle(bookLesson)"
                 >
       </TextInput>

        <Button class="btn btn-outline-success add-lesson"
               @click="addLesson(bookLesson.id)"
                small
                spinWhenClicked
                >
          <font-awesome-icon icon="plus" />
       </Button>

      <Button class="btn btn-outline-danger remove-book-lesson"
              @click="deleteBookLesson({id: bookLesson.id})"
              spinWhenClicked
              small
              >
        <font-awesome-icon icon="trash" />
      </Button>
     </h2>

      <ul class="nav flex-column">
        <Lesson v-for="lesson in bookLesson.lessonList"
                :key="lesson.id"
                :lesson="lesson">
        </Lesson>
      </ul>
    </div>

  </nav>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import Button from '../form/Button'
import TextInput from '../form/TextInput'
import Lesson from '../lesson/Lesson'
import _ from 'lodash'

export default {
  components: {
    Lesson,
    Button,
    TextInput,
  },
  name: 'SideMenu',
  props: ['title'],
  computed: {
    ...mapState('lesson', ['lessons', 'bookLessons']),
  },
  methods: {
    ...mapActions(
      'lesson',
      [
        'updateLessons',
        'saveBookLesson',
        'patchBookLesson',
        'deleteBookLesson',
        'saveLesson',
        'loadAllBookLessons'
      ]
    ),
    addBookLesson() {
      this.saveBookLesson({bookLesson: {
          title: 'New lesson',
          subtitle: '',
          course: '/api/courses/1',
      }})
    },
    addLesson(bookLessonId) {
      this.saveLesson({lesson: {
          title: 'New lesson',
          subtitle: '',
          bookLesson: '/api/book_lessons/' + bookLessonId,
      }})
    },
    updateBookLessonTitle: _.debounce(function (bookLesson) {
      window.console.log('coucou')
      this.patchBookLesson({
        id: bookLesson.id,
        data: {title: bookLesson.title},
      })
    }, 1000),
  },
  created() {
    this.loadAllBookLessons()
  }
}
</script>

<style lang="sass" scoped>
.sidebar
  position: fixed
  overflow-y: scroll
  width: 500px
  top: 0
  bottom: 0
  left: 0
  z-index: 100
  padding: 64px 0 0 12px
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1)
  font-size: .875rem

  & .book-lesson:not(:first-child)
    margin-top: 16px

.sidebar-sticky
  position: relative
  top: 0
  height: calc(100vh - 48 px)
  padding-top: .5rem
  overflow-x: hidden
  overflow-y: auto

h1
  font-size: 24px

h2
  font-size: 16px
  text-transform: uppercase
  margin: 0
  height: 32px
  width: 100%
  display: flex
  align-items: center

  button.add-lesson,button.remove-book-lesson
    font-size: 10px
    width: 32px
    margin-left: 8px
    display: none

  span
    display: block

  &:hover
    button.add-lesson,button.remove-book-lesson
      display: inline-block
</style>
