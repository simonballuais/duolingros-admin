<template>
  <div>
    <canvas id="pasteCanvas" width="256" height="256"></canvas>

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

      <hr v-if="currentLesson.translations" />
      <h3 v-if="currentLesson.translations">Translations</h3>

      <transition-group name="translation-list" tag="div">
        <TranslationDetails v-for="(translation, translationIndex) in translations"
                            :key="`${translation.id}-${translation.frontId}`"
                            :translation="translation"
                            @change="handleChange()"
                            @removeRequest="removeTranslation(translation.id)"
        />

      </transition-group>

      <button class="btn btn-outline-success ml-1"
              @click="addTranslation"
              >
        <font-awesome-icon icon="plus" />
      </button>

      <hr v-if="currentLesson.questions" />
      <h3 v-if="currentLesson.questions">Questions</h3>

      <transition-group name="question-list" tag="div">
        <QuestionDetails v-for="(question, questionIndex) in questions"
                            :key="`${question.id}-${question.frontId}`"
                            :question="question"
                            @change="handleChange()"
                            @removeRequest="removeQuestion(question.id)"
        />
      </transition-group>

      <button class="btn btn-outline-success ml-1"
              @click="addQuestion"
              >
        <font-awesome-icon icon="plus" />
      </button>
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
import QuestionDetails from '../question/QuestionDetails'

export default {
  name: 'LessonDetails',
  components: {
    Form,
    TextInput,
    Spinner,
    TranslationDetails,
    QuestionDetails,
  },
  computed: {
    ...mapState('lesson', ['status', 'currentLesson', 'lessonUndoable']),
    translations() {
      return this.currentLesson.translations.slice().sort(
        (a, b) => a.difficulty - b.difficulty
      )
    },
    questions() {
      return this.currentLesson.questions.slice().sort(
        (a, b) => a.difficulty - b.difficulty
      )
    },
  },
  methods: {
    ...mapActions(
      'lesson',
      [
        'saveCurrentLesson',
        'undoCurrentLesson',
        'saveQuestion',
        'deleteQuestion',
        'deleteTranslation',
      ]
    ),
    handleChange: _.debounce(function () {
      this.saveCurrentLesson()
    }, 1000),
    removeTranslation(id) {
      this.deleteTranslation({id})
    },
    addTranslation() {
      let lastFrontId = Math.max(...this.currentLesson.translations.map((e) => e.frontId))

      this.currentLesson.translations.push({
        frontId: lastFrontId + 1,
        text: '',
        difficulty: 1,
        answers: [''],
      })

      this.handleChange()
    },
    addQuestion() {
      this.saveQuestion({question: {
        lesson: '/api/lessons/' + this.currentLesson.id,
        text: '',
        difficulty: 1,
      }})
    },
    removeQuestion(id) {
      this.deleteQuestion({id})
    },
  },
  created() {
    this.$store.subscribe((mutation) => {
      if (mutation.type === 'lesson/questionSaved') {
        window.console.log('COCUOC question')
      }
    });
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

.question-list-move
  transition: transform 1s

canvas
  display: none
</style>
