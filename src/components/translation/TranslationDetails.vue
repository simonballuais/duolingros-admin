<template>
  <div class="translation">
    <div class="input-group">
      <div class="input-group-prepend flex-grow-1">
        <TextInput placeholder="Text"
                   v-model="translation.text"
                   @keyup="$emit('change')"
                   />
      </div>

      <TextInput placeholder="Text"
                 v-model="translation.difficulty"
                 @keyup="$emit('change')"
                 />

      <div class="input-group-append">
        <button type="button"
                class="btn btn-outline-danger remove-translation"
                >
          X
        </button>
      </div>
    </div>

    <ul>
      <li v-for="(answer, index) in translation.answerList"
          class="answer"
          :key="index">
        <div class="input-group">
          <button type="button"
                  class="btn btn-outline-success add-answer"
                  @click="addAnswer()"
                  v-if="index == translation.answerList.length - 1"
                  >
            +
          </button>

          <TextInput placeholder="Possible answer"
                     v-model="translation.answerList[index]"
                     :small="true"
                     @keyup="$emit('change')"
                     />
          <div class="input-group-append">
            <button type="button"
                    class="btn btn-outline-danger remove-answer"
                    @click="removeAnswer(index)"
                    v-if="translation.answerList.length > 1"
                    >
              X
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import TextInput from '../form/TextInput'

export default {
  name: 'TranslationDetails',
  props: ['translation'],
  components: {
    TextInput,
  },
  methods: {
    removeAnswer (answerIndex) {
      this.translation.answerList.splice(answerIndex, 1)
      this.$emit('change')
    },
    addAnswer () {
      this.translation.answerList.push('')
      this.$emit('change')
    }
  }
}
</script>

<style lang="sass" scoped>
.translation
  margin-top: 24px

ul
  list-style: none
  padding: 0

  li
    margin: 5px 0 0 36px

    &.answer
      .remove-answer, .add-answer
        font-size: 10px
        display: none

        &.add-answer
          width: 32px

ul:hover
  li
    &.answer
      .add-answer, .remove-answer
        display: block

  li:last-child
    margin-left: 0

    &.answer .add-answer
      margin-right: 4px
</style>
