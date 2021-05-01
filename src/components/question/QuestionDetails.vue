<template>
  <div class="question">
    <hr>
    <div class="input-group">
      <div class="input-group-prepend flex-grow-1">
        <TextInput placeholder="Text"
                   v-model="question.text"
                   @keyup="$emit('change')"
                   :style="{'background-color': question.text && question.answer ? 'transparent' : 'pink'}"
                   bold
                   />
      </div>

      <br>
      No pic
      <Checkbox v-model="question.noPictures"
                @keyup="$emit('change')"
                @input="$emit('change')"
                />

      |
      Gasy -> fr
      <Checkbox v-model="question.direction"
                @keyup="$emit('change')"
                @input="$emit('change')"
                />

      <div class="input-group-append">
        <Button type="button"
                class="btn btn-outline-danger remove-question"
                @click="$emit('removeRequest', this)"
                spinWhenClicked
                >
          X
        </Button>
      </div>
    </div>

    <ul>
      <li v-for="(proposition, index) in question.propositions"
          class="proposition"
          :key="index"
          >

        <div class="input-group">
          <Button type="button"
                  class="btn btn-outline-success add-proposition"
                  @click="addProposition(question)"
                  v-if="index === question.propositions.length - 1"
                  spinWhenClicked
                  >
            <font-awesome-icon icon="plus" />
          </Button>


          <TextInput placeholder="Text"
                     v-model="proposition.text"
                     @keyup="$emit('change')"
                     type="text"
                     small
                     :style="{
                        'background-color': proposition.text ? 'white' : 'pink',
                        'border': proposition.rightAnswer ? '2px solid lightgreen' : '1px solid lightgray'
                     }"
                     />

          <TextInput placeholder="Text"
                     v-model="proposition.image"
                     v-if="!question.noPictures"
                     @paste="pasteImg(proposition, $event)"
                     :style="{'background-color': proposition.image ? 'white' : 'pink'}"
                     type="text"
                     small
                     />

          <img :src="proposition.image"
                     v-if="!question.noPictures"
          />

          <div style="width: 34px">
            <Button type="button"
                    class="btn btn-outline-danger remove-proposition"
                    @click="removeProposition(proposition.id)"
                    v-if="question.propositions.length > 1"
                    spinWhenClicked
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
import {mapActions} from 'vuex'

import TextInput from '../form/TextInput'
import Checkbox from '../form/Checkbox'
import Button from '../form/Button'

export default {
  name: 'QuestionDetails',
  data() {
    return {
      pasteImage: null,
      pasteCanvas: null,
    }
  },
  props: ['question'],
  components: {
    TextInput,
    Checkbox,
    Button,
  },
  methods: {
    ...mapActions(
      'lesson', [
      'saveProposition',
      'deleteProposition'
      ]),
    removeProposition (id) {
      this.deleteProposition({id});
    },
    addProposition (question) {
      this.saveProposition({proposition: {
          text: '',
          rightAnswer: false,
          image: '',
          question: '/api/questions/' + question.id,
      }})
    },
    pasteImg(proposition, e) {
      for (var i = 0 ; i < e.clipboardData.items.length ; i++) {
        let item = e.clipboardData.items[i];

        if (item.type.indexOf("image") != -1) {
          this.pasteImage.targetEntity = proposition
          this.pasteImage.src = URL.createObjectURL(item.getAsFile());
        } else {
          window.console.log("Discarding non-image paste data");
        }
      }
    },
  },
  mounted() {
    this.canvas = document.getElementById('pasteCanvas');
    let context = this.canvas.getContext('2d');
    this.pasteImage = new Image()

    this.pasteImage.onload = () => {
      let smallestSize = Math.min(this.pasteImage.width, this.pasteImage.height)
      let transformRatio = this.canvas.height / smallestSize

      let destinationSize = {
        width: this.pasteImage.width * transformRatio,
        height: this.pasteImage.height * transformRatio
      }

      context.drawImage(
        this.pasteImage,

        0,
        0,
        this.pasteImage.width,
        this.pasteImage.height,

        (this.canvas.width - destinationSize.width) / 2,
        (this.canvas.height - destinationSize.height) / 2,
        destinationSize.width,
        destinationSize.height
      );
      let base64Image = this.canvas.toDataURL('image/png');
      this.pasteImage.targetEntity.image = base64Image
      this.$emit('change')
    };

  },
}
</script>

<style lang="sass" scoped>
.question
  margin-top: 24px

ul
  list-style: none
  padding: 0
  margin: 0

  li
    margin: 5px 0 0 36px

    &.proposition
      margin: 0

      .remove-proposition
        margin-left: 3px

      .remove-proposition, .add-proposition
        font-size: 10px
        height: 32px
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

img
  margin: 3px 3px 3px 20px
  border-radius: 5px
  width: 3cm
  height: 3cm
</style>
