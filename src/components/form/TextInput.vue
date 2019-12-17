<template>
  <input class="form-control"
         :type="type"
         :placeholder="placeholder"
         :aria-label="placeholder"
         v-model="value"
         @input="$emit('input', value)"
         @keyup="$emit('keyup', value)"
         :class="{ big, small }"
         >
</template>

  <script>
export default {
  props: {
    'placeholder': {
      type: String,
      default: '',
    },
    'type': {
      type: String,
      default: 'text',
    },
    'small': {
      type: Boolean,
      default: false,
    },
    'big': {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return{
      'value': '',
    }
  },
}
</script>

<style lang="sass">
input.big
  font-size: 32px
  font-variant: small-caps

input.small
  font-size: 12px
</style>
