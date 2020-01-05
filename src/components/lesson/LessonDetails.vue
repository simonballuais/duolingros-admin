<template>
  <div>
    <div class="d-flex pt-3 pb-2 border-bottom align-items-center">
      <TextInput :placeholder="'Title'"
         v-model="currentLesson.title"
         @input="handleChange()"
         :big="true"
      />
      <button class="btn btn-outline-primary ml-2"
              @click="undoCurrentLesson"
              :disabled="!lessonUndoable"
              >
        <font-awesome-icon icon="undo" />
      </button>

      <button class="btn btn-outline-secondary ml-2"
              v-if="!status.savingLesson"
              @click="undoCurrentLesson"
              disabled
              >
        <font-awesome-icon icon="save" />
      </button>
      <Spinner v-if="status.savingLesson" />
    </div>

    <Form>
      <div class="input-group">
        <div class="input-group-prepend flex-grow-1">
          <TextInput placeholder="Description"
                     v-model="currentLesson.description"
                     @keyup="handleChange()"
                     />
        </div>

        <TextInput placeholder="Exercise per study"
                   v-model.number="currentLesson.exercisePerStudy"
                   type="number"
                   @keyup="handleChange()"
                   />
      </div>

      <hr v-if="currentLesson.translationList" />
      <h3 v-if="currentLesson.translationList">Translations</h3>

      <transition-group name="translation-list" tag="div">
        <TranslationDetails v-for="translation in translationList"
                            :key="translation.id"
                            :translation="translation"
                            @change="handleChange()"
        />
      </transition-group>
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
    ...mapState('lesson', ['status', 'currentLesson', 'lessonUndoable']),
    translationList() {
      return this.currentLesson.translationList.slice().sort(
        (a, b) => a.difficulty - b.difficulty
      )
    },
  },
  methods: {
    ...mapActions('lesson', ['saveCurrentLesson', 'undoCurrentLesson']),
    handleChange: _.debounce(function () {
      this.saveCurrentLesson()
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

.translation-list-move
  transition: transform 1s
</style>
