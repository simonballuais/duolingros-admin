<template>
  <div>
      <TextInput placeholder="Text"
                 v-model="translation.text"
                 @keyup="$emit('keyup', value)"
      />

      <ul>
        <li v-for="(answer, index) in translation.answerList"
            :key="index">
          <TextInput placeholder="Possible answer"
                     v-model="translation.answerList[index]"
                     :small="true"
          />
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
}
</script>

<style lang="sass" scoped>
ul
  list-style: none

  li
    margin: 5px
</style>
