<template>
  <div class="jumbotron">
    <div class="container">
      <div class="row">
        <div class="col-sm-6 offset-sm-3">
          <InlineForm v-on:submit="handleSubmit">
          <div class="form-group">
            <Input v-model="username" placeholder="Login" />
            <small v-if="status.invalidCredentials"
                   class="form-text text-danger">
              Invalid credentials
            </small>
          </div>
          <div class="form-group">
            <Input v-model="password" placeholder="Password" type="password" />
          </div>
          <div class="form-group">
            <Submit label="Go" :loading="status.loggingIn" />
          </div>
          </InlineForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

import InlineForm from './form/InlineForm.vue'
import Input from './form/Input.vue'
import Submit from './form/Submit.vue'

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      loading: false,
    }
  },
  computed: {
    ...mapState('security', ['status']),
  },
  components: {
    InlineForm,
    Input,
    Submit,
  },
  methods: {
    ...mapActions('security', ['login', 'logout']),
    handleSubmit() {
      this.loading = true
      const {username, password} = this

      if (username && password) {
        window.console.log(this.login)
        this.login({username, password})
      }
    }
  }
}
</script>
