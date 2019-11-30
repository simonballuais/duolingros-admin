<template>
  <input class="form-control mr-sm-2"
         :type="type"
         :placeholder="placeholder"
         :aria-label="placeholder"
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
  },
}
</script>
