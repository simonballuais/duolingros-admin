<template>
  <div>
    <h2>
      Difficulty {{ difficulty }}
      ({{ getTranslationsOfDifficulty(difficulty).length + getQuestionsOfDifficulty(difficulty).length }} / 20)

      <Button class="btn btn-outline-primary"
              @click="toggleFold"
              style="width: 180px;"
              >
          V
      </Button>
        &nbsp;
      <Button class="btn btn-outline-primary"
              @click="duplicateToNextDifficulty(difficulty)"
              requiresConfirmation
              style="width: 180px;"
              >
          CP to next
      </Button>
        &nbsp;
      <Button class="btn btn-outline-danger"
              @click="deleteAllOfDifficulty(difficulty)"
              requiresConfirmation
              >
        <font-awesome-icon icon="trash" />
      </Button>
    </h2>
    <div class="difficulty-group" :class="{ folded }">
      <h3>
        Translations
        <Button class="btn btn-outline-success ml-1"
                @click="addTranslation(difficulty)"
                spinWhenClicked
                >
          <font-awesome-icon icon="plus" />
        </Button>
      </h3>

      <transition-group name="translation-list" tag="div">
        <TranslationDetails v-for="(translation, translationIndex) in getTranslationsOfDifficulty(difficulty)"
                            :key="`${translation.id}-${translation.frontId}`"
                            :translation="translation"
                            @change="$emit('change')"
                            @removeRequest="removeTranslation(translation.id)"
        />

      </transition-group>

      <Button class="btn btn-outline-success ml-1"
              @click="addTranslation(difficulty)"
              spinWhenClicked
              >
        <font-awesome-icon icon="plus" />
      </Button>

      <h3>
        Questions
        <Button class="btn btn-outline-success ml-1"
                @click="addQuestion(difficulty)"
                spinWhenClicked
                >
          <font-awesome-icon icon="plus" />
        </Button>
      </h3>

      <transition-group name="question-list" tag="div">
        <QuestionDetails v-for="(question, questionIndex) in getQuestionsOfDifficulty(difficulty)"
                            :key="`${question.id}-${question.frontId}`"
                            :question="question"
                            @change="$emit('change')"
                            @removeRequest="removeQuestion(question.id)"
        />
      </transition-group>

      <Button class="btn btn-outline-success ml-1"
              @click="addQuestion(difficulty)"
              spinWhenClicked
              >
        <font-awesome-icon icon="plus" />
      </Button>
    </div>

    <hr style="border-bottom: 3px solid gray" />
  </div>
</template>

<script>
import {mapActions} from 'vuex'

import TranslationDetails from '../translation/TranslationDetails'
import QuestionDetails from '../question/QuestionDetails'
import Button from '../form/Button'

export default {
  name: 'LessonDetails',
  components: {
    TranslationDetails,
    QuestionDetails,
    Button,
  },
  data() {
    return {
      folded: true,
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
        'updateCurrentLesson',
        'saveQuestion',
        'saveQuestionButDontUpdate',
        'savePropositionButDontUpdate',
        'saveTranslation',
        'saveTranslationButDontUpdate',
        'deleteQuestion',
        'deleteQuestionButDontUpdate',
        'deleteTranslation',
        'deleteTranslationButDontUpdate',
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
    addTranslation(difficulty) {
      this.saveTranslation({translation: {
        lesson: '/api/lessons/' + this.lesson.id,
        text: '',
        difficulty: difficulty,
        answers: [''],
      }})
    },
    addQuestion(difficulty) {
      this.saveQuestion({question: {
        lesson: '/api/lessons/' + this.lesson.id,
        text: '',
        difficulty: difficulty,
      }})
      .then((newQuestion) =>
        Promise.all([1, 2, 3].map(
          () =>
            this.savePropositionButDontUpdate({proposition: {
                question: '/api/questions/' + newQuestion.id,
                image: null,
                rightAnswer: false,
                text: '',
            }})
          )
        ).then(() => this.updateCurrentLesson({id: this.lesson.id}))
      )
    },
    removeQuestion(id) {
      this.deleteQuestion({id})
    },
    removeTranslation(id) {
      this.deleteTranslation({id})
    },
    toggleFold() {
      this.folded = !this.folded
    },
    duplicateToNextDifficulty(startDifficulty) {
      if (startDifficulty === 5) {
        return
      }

      const translations = this.getTranslationsOfDifficulty(startDifficulty)
      const questions = this.getQuestionsOfDifficulty(startDifficulty)
      let promises = []
      let propositionPromises = []

      translations.forEach((t) =>
        promises.push(
          this.saveTranslationButDontUpdate({translation: {
            lesson: '/api/lessons/' + this.lesson.id,
            text: t.text,
            difficulty: startDifficulty + 1,
            answers: [...t.answers],
          }})
        )
      )

      questions.forEach((q) =>
        this.saveQuestionButDontUpdate({question: {
            lesson: '/api/lessons/' + this.lesson.id,
            difficulty: startDifficulty + 1,
            direction: q.direction,
            noPictures: q.noPictures,
            text: q.text,
            propositions: [],
          }})
          .then((newQuestion) =>
            q.propositions.forEach((p) => {
              propositionPromises.push(
                this.savePropositionButDontUpdate({proposition: {
                    question: '/api/questions/' + newQuestion.id,
                    image: p.image,
                    rightAnswer: p.rightAnswer,
                    text: p.text,
                }})
              )
            })
          )
      )

      Promise.all(promises).then(() => {
        this.updateCurrentLesson({id: this.lesson.id})
        Promise.all(propositionPromises).then(() => this.updateCurrentLesson({id: this.lesson.id}))
      })
    },
    deleteAllOfDifficulty(difficulty) {
      const translations = this.getTranslationsOfDifficulty(difficulty)
      const questions = this.getQuestionsOfDifficulty(difficulty)
      let promises = []

      translations.forEach((t) => promises.push(this.deleteTranslationButDontUpdate({id: t.id})))
      questions.forEach((q) => promises.push(this.deleteQuestionButDontUpdate({id: q.id})))

      Promise.all(promises).then(() => {
        this.updateCurrentLesson({id: this.lesson.id})
      })
    }
  },
}
</script>

<style lang="sass" scoped>
h2
  padding: 5px
  margin-top: 5px
  cursor: pointer

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
  max-height: 99000cm

  &.folded
    transform: scaleY(0)
    max-height: 0px
</style>
