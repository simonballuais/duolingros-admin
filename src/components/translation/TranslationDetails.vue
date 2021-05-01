<template>
  <div class="translation">
    <div class="input-group">
      <div class="input-group-prepend flex-grow-1">
        <TextInput placeholder="Text"
                   v-model="translation.text"
                   @keyup="$emit('change')"
                   bold
                   :style="{'background-color': translation.text ? 'transparent' : 'pink'}"
                   class="hoverable-input"
                   :tabindex="tabIndexRoot * 10"
                   />
      </div>

      <div class="input-group-append">
        <Button type="button"
                class="btn btn-outline-danger remove-translation"
                @click="$emit('removeRequest', this)"
                spinWhenClicked
                tabindex="-1"
                >
          X
        </Button>
      </div>
    </div>

    <ul>
      <li v-for="(answer, index) in translation.answers"
          class="answer"
          :key="index">
        <div class="input-group">
          <Button type="button"
                  class="btn btn-outline-success add-answer"
                  @click="addAnswer()"
                  v-if="index == translation.answers.length - 1"
                  >
            <font-awesome-icon icon="plus" />
          </Button>

          <TextInput placeholder="Possible answer"
                     v-model="translation.answers[index]"
                     :small="true"
                     @keyup="$emit('change')"
                     :style="{'background-color': translation.answers[index] ? 'transparent' : 'pink'}"
                     class="hoverable-input"
                     :tabindex="tabIndexRoot * 10 + index + 1"
                     />
          <div class="input-group-append">
            <Button type="button"
                    class="btn btn-outline-danger remove-answer"
                    @click="removeAnswer(index)"
                    v-if="translation.answers.length > 1"
                    tabindex="-1"
                    >
              X
            </Button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import TextInput from '../form/TextInput'
import Button from '../form/Button'

export default {
  name: 'TranslationDetails',
  props: ['translation', 'tabIndexRoot'],
  components: {
    TextInput,
    Button,
  },
  methods: {
    removeAnswer (answerIndex) {
      this.translation.answers.splice(answerIndex, 1)
      this.$emit('change')
    },
    addAnswer () {
      this.translation.answers.push('')
      this.$emit('change')
    }
  }
}
</script>

<style lang="sass" scoped>
.translation
  margin-top: 4px

ul
  list-style: none
  padding: 0
  margin: 0

  li
    margin: 0 0 0 36px

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

.hoverable-input
  border: 0

  &:hover, &:focus
    border: 1px solid lightgray

</style>
