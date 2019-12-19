<template>
  <div>
    <div class="d-flex pt-3 pb-2 border-bottom align-items-center">
      <TextInput :placeholder="'Title'"
         v-model="lesson.title"
         @keyup="handleChange()"
         :big="true"
         />
      <Spinner v-if="status.savingLesson" />
    </div>

    <Form>
      <div class="input-group">
        <div class="input-group-prepend flex-grow-1">
          <TextInput placeholder="Description"
                     v-model="lesson.description"
                     @keyup="handleChange()"
                     />
        </div>

        <TextInput placeholder="Exercise per study"
                   v-model="lesson.exercisePerStudy"
                   type="number"
                   @keyup="handleChange()"
                   />
      </div>

      <hr v-if="lesson.translationList" />
      <h3 v-if="lesson.translationList">Translations</h3>

      <TranslationDetails v-for="translation in lesson.translationList"
                          :key="translation.id"
                          :translation="translation"
                          @change="handleChange()"
      />

    </Form>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import _ from 'lodash'

import Form from '../form/Form'
import TextInput from '../form/TextInput'
import Spinner from '../misc/Spinner'
import TranslationDetails from '../translation/TranslationDetails'

export default {
  name: 'LessonDetails',
  components: {
    Form,
    TextInput,
    Spinner,
    TranslationDetails,
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
.spinner-container
  margin: 0 8px 0 8px
</style>

<style lang="sass" scoped>
h3
  margin-bottom: 24px
</style>
