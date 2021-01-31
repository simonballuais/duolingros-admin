<template>
  <button type="button"
          class="btn btn-outline-primary"
          @click="clicked"
          >
    <slot v-if="!spinning && !waitingForConfirmation"></slot>

    <span v-if="waitingForConfirmation">?</span>

    <span class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
          v-if="spinning && !waitingForConfirmation"
    ></span>
  </button>
</template>

<script>
export default {
  props: {
    'spinWhenClicked': {
      type: Boolean,
      default: false,
    },
    'requiresConfirmation': {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return{
      'spinning': false,
      'waitingForConfirmation': false,
      'confirmationSpan': [null, null],
    }
  },
  methods: {
    clicked(e) {
      if (this.requiresConfirmation) {
        const now = Date.now()

        if (this.waitingForConfirmation) {
          if (now < this.confirmationSpan[0] || now > this.confirmationSpan[1]) {
            return
          }

          this.waitingForConfirmation = false
        } else {
          this.waitingForConfirmation = true
          this.confirmationSpan = [
            now + 250,
            now + 2000,
          ]

          setTimeout(() => {
              this.waitingForConfirmation = false
              this.confirmationSpan = [null, null]
            },
            2000
          )

          return
        }
      }

      if (this.spinWhenClicked) {
        this.spinning = true
      }

      this.$emit('click', e)
    },
  },
}
</script>

<style lang="sass" scoped>
svg.svg-inline--fa.fa-plus
  margin-left: -1px

span.spinner-border.spinner-border-sm
  margin-left: -4px
  margin-top: 1px
</style>
