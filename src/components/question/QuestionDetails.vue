<template>
  <div class="question">
    <div class="input-group">
      <div class="input-group-prepend flex-grow-1">
        <TextInput placeholder="Text"
                   v-model="question.text"
                   @keyup="$emit('change')"
                   bold
                   />
      </div>

      <Checkbox label="No picture"
                v-model="question.noPicture"
                @keyup="$emit('change')"
                @input="$emit('change')"
                />

      <TextInput placeholder="Text"
                 v-model="question.difficulty"
                 @keyup="$emit('change')"
                 @input="$emit('change')"
                 type="number"
                 />

      <div class="input-group-append">
        <button type="button"
                class="btn btn-outline-danger remove-question"
                @click="$emit('removeRequest', this)"
                >
          X
        </button>
      </div>
    </div>

    <ul>
      <li v-for="(proposition, index) in question.propositionList"
          class="proposition"
          :key="index"
          >

        <div class="input-group">
          <button type="button"
                  class="btn btn-outline-success add-proposition"
                  @click="addProposition()"
                  v-if="index == question.propositionList.length - 1"
                  >
            +
          </button>

          <TextInput placeholder="Text"
                     v-model="proposition.text"
                     @keyup="$emit('change')"
                     type="text"
                     />

          <Checkbox placeholder="Text"
                    v-model="proposition.rightAnswer"
                    @keyup="$emit('change')"
                    @input="$emit('change')"
                    />

          <div class="input-group-append">
            <button type="button"
                    class="btn btn-outline-danger remove-proposition"
                    @click="removeProposition(index)"
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
import Checkbox from '../form/Checkbox'

export default {
  name: 'QuestionDetails',
  props: ['question'],
  components: {
    TextInput,
    Checkbox,
  },
  methods: {
    removeProposition (propositionIndex) {
      this.question.propositionList.splice(propositionIndex, 1)
      this.$emit('change')
    },
    addProposition () {
      this.question.propositionList.push({
        text: '',
        rightAnswer: true,
        image: '',
      })
      this.$emit('change')
    }
  }
}
</script>

<style lang="sass" scoped>
.question
  margin-top: 24px

ul
  list-style: none
  padding: 0

  li
    margin: 5px 0 0 36px

    &.proposition
      .remove-proposition, .add-proposition
        font-size: 10px
        display: none

        &.add-proposition
          width: 32px

ul:hover
  li
    &.proposition
      .add-proposition, .remove-proposition
        display: block

  li:last-child
    margin-left: 0

    &.proposition .add-proposition
      margin-right: 4px
</style>
