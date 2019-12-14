<template>
  <li>
    {{ lesson.id }} - {{ lesson.title }}
  </li>
</template>

<script>
export default {
  name: 'Lesson',
  props: ['lesson'],
}
</script>
