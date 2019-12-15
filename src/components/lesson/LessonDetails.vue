<template>
  <main class="col-md-9" role="main">
  <div class="d-flex pt-3 pb-2 border-bottom align-items-center">
    <BigTextInput :placeholder="'Title'"
                  v-model="lesson.title"
                  @keyup="handleChange"
    />
    <div class="spinner-container" v-if="status.savingLesson">
      <Spinner />
    </div>
  </div>

  <Form>
    <TextInput :placeholder="'Description'"
               v-model="lesson.description"
               @keyup="handleChange"
    />
  </Form>
  </main>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import _ from 'lodash'

import Form from '../form/Form'
import TextInput from '../form/TextInput'
import BigTextInput from '../form/BigTextInput'
import Spinner from '../misc/Spinner'

export default {
  name: 'LessonDetails',
  components: {
    Form,
    TextInput,
    BigTextInput,
    Spinner,
  },
  computed: {
    ...mapState('lesson', ['status']),
  },
  props: ['lesson'],
  methods: {
    ...mapActions('lesson', ['saveLesson']),
    handleChange: _.debounce(function () {
      this.saveLesson({ lesson: this.lesson })
    }, 1000),
  }
}
</script>

<style lang="sass">
input.big
  font-size: 32px
  font-variant: small-caps

.spinner-container
  margin: 16px
</style>
