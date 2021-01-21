<template>
  <button type="button"
          class="btn btn-outline-primary"
          @click="clicked"
          >
    <Spinner v-if="spinning" small />
  </button>
</template>

  <script>
import Spinner from '../misc/Spinner'

export default {
  components: {
    Spinner,
  },
  props: {
    'spinWhenClicked': {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return{
      'spinning': false,
    }
  },
  methods: {
    clicked(e) {
      if (this.spinWhenClicked) {
        this.spinning = true
      }

      this.$emit('click', e)
    },
  },
}
</script>
