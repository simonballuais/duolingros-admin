<template>
  <button class="btn btn-success"
          type="submit">
    {{ label }}
  </button>
</template>

<script>
export default {
  props: {
    'label': {
      type: String,
      default: 'Ok',
    },
  },
}
</script>
