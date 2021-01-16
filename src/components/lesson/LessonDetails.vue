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
        <TranslationDetails v-for="(translation, translationIndex) in translationList"
                            :key="translation.id"
                            :translation="translation"
                            @change="handleChange()"
                            @removeRequest="removeTranslation(translationIndex)"
        />

      </transition-group>

      <button class="btn btn-outline-primary ml-1"
              @click="addTranslation"
              >
        <font-awesome-icon icon="plus" />
      </button>

      <hr v-if="currentLesson.questionList" />
      <h3 v-if="currentLesson.questionList">Questions</h3>

      <transition-group name="question-list" tag="div">
        <QuestionDetails v-for="(question, questionIndex) in questionList"
                            :key="question.id"
                            :question="question"
                            @change="handleChange()"
                            @removeRequest="removeQuestion(questionIndex)"
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
    translationList() {
      return this.currentLesson.translationList.slice().sort(
        (a, b) => a.difficulty - b.difficulty
      )
    },
    questionList() {
      return this.currentLesson.questionList.slice().sort(
        (a, b) => a.difficulty - b.difficulty
      )
    },
  },
  methods: {
    ...mapActions('lesson', ['saveCurrentLesson', 'undoCurrentLesson']),
    handleChange: _.debounce(function () {
      this.saveCurrentLesson()
    }, 1000),
    removeTranslation(translationIndex) {
      this.currentLesson.translationList.splice(translationIndex, 1)
      this.saveCurrentLesson()
    },
    addTranslation() {
      let lastId = Math.max(...this.currentLesson.translationList.map((e) => e.id))

      this.currentLesson.translationList.push({
        id: lastId + 1,
        text: '',
        difficulty: 1,
        answerList: [''],
      })

      this.handleChange()
    }
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
</style>
