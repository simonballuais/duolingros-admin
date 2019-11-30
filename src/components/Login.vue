<template>
  <InlineForm>
    <Input placeholder="Login" />
    <Input placeholder="Password" type="password" />
    <Submit label="Go" />
  </InlineForm>
</template>

<script>
import InlineForm from './form/InlineForm.vue'
import Input from './form/Input.vue'
import Submit from './form/Submit.vue'

export default {
  name: 'Login',
  components: {
    InlineForm,
    Input,
    Submit,
  },
}
</script>
