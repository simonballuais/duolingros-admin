<template>
  <div>
    <h2 @click="toggleFold">Difficulty {{ difficulty }}</h2>
    <div class="difficulty-group" :class="{ folded }">
      <h3>
        Translations
        <button class="btn btn-outline-success ml-1"
                @click="addTranslation(difficulty)"
                >
          <font-awesome-icon icon="plus" />
        </button>
      </h3>

      <transition-group name="translation-list" tag="div">
        <TranslationDetails v-for="(translation, translationIndex) in getTranslationsOfDifficulty(difficulty)"
                            :key="`${translation.id}-${translation.frontId}`"
                            :translation="translation"
                            @change="$emit('change')"
                            @removeRequest="removeTranslation(translation.id)"
        />

      </transition-group>


      <h3>
        Questions
        <button class="btn btn-outline-success ml-1"
                @click="addQuestion(difficulty)"
                >
          <font-awesome-icon icon="plus" />
        </button>
      </h3>

      <transition-group name="question-list" tag="div">
        <QuestionDetails v-for="(question, questionIndex) in getQuestionsOfDifficulty(difficulty)"
                            :key="`${question.id}-${question.frontId}`"
                            :question="question"
                            @change="$emit('change')"
                            @removeRequest="removeQuestion(question.id)"
        />
      </transition-group>
    </div>

    <hr />
  </div>
</template>

<script>
import {mapActions} from 'vuex'

import TranslationDetails from '../translation/TranslationDetails'
import QuestionDetails from '../question/QuestionDetails'

export default {
  name: 'LessonDetails',
  components: {
    TranslationDetails,
    QuestionDetails,
  },
  data() {
    return {
      folded: false,
    }
  },
  props: {
    'lesson': {
      type: Object,
      default: null,
    },
    'difficulty': {
      type: Number,
      default: 1,
    },
  },
  methods: {
    ...mapActions(
      'lesson',
      [
        'saveQuestion',
        'deleteQuestion',
        'deleteTranslation',
      ]
    ),
    getTranslationsOfDifficulty(difficulty) {
      return this.lesson.translations.slice().filter(
        (a) => a.difficulty === difficulty
      )
    },
    getQuestionsOfDifficulty(difficulty) {
      return this.lesson.questions.slice().filter(
        (a) => a.difficulty === difficulty
      )
    },
    removeTranslation(id) {
      this.deleteTranslation({id})
    },
    addTranslation(difficulty) {
      let lastFrontId = Math.max(...this.lesson.translations.map((e) => e.frontId))

      this.lesson.translations.push({
        frontId: lastFrontId + 1,
        text: '',
        difficulty: difficulty,
        answers: [''],
      })

      this.handleChange()
    },
    addQuestion(difficulty) {
      this.saveQuestion({question: {
        lesson: '/api/lessons/' + this.lesson.id,
        text: '',
        difficulty: difficulty,
      }})
    },
    removeQuestion(id) {
      this.deleteQuestion({id})
    },
    toggleFold() {
      this.folded = !this.folded
    }
  },
}
</script>

<style lang="sass" scoped>
h2
  padding: 5px
  margin-top: 5px
h3
  margin-bottom: 24px
  color: #555

.translation-list-move
  transition: transform 1s

.question-list-move
  transition: transform 1s

canvas
  display: none

div.difficulty-group
  margin-left: 16px
  transition: transform 0.5s, max-height 1s
  overflow: hidden
  transform-origin: top
  max-height: 2000px

  &.folded
    transform: scaleY(0)
    max-height: 0px
</style>
