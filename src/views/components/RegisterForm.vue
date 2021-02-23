<template>
  <form
  class="form"
  action="/"
  novalidate
  @submit.prevent="submit($event)"
  >
    <div class="form__container">
      <div class="form__block">
        <h2 class="heading heading--md">REGISTER</h2>
      </div>

      <div class="form__block">
        <EmailInput
          label="email"
          type="email"
          name="email"
          :field="'email'"
          v-model="$v.form.email.$model"
          @blur="$v.form.email.$touch()"
        />

         <!-- <span v-if="errors.email">{{errors.email}}</span> -->
      </div>

      <div class="form__block">
        <PasswordInput
          label="password"
          type="password"
          name="password"
          :field="'password'"

          v-model.trim="$v.form.password.$model"
          @blur="$v.form.password.$touch()"
        />
         <!-- <span v-if="msg.password">{{msg.password}}</span> -->
      </div>

      <div class="form__block">
        <ConfirmInput
          label="confirm password"
          type="password"
          name="confirm"
          :field="'confirm'"
          :modifier="formModifier($v.form.confirm)"
          v-model.trim="$v.form.confirm.$model"
          @blur="$v.form.confirm.$touch()"
        />
         <!-- <span v-if="msg.confirm">{{msg.confirm}}</span> -->
      </div>

      <div class="form__block">
        <Button
          text="REGISTER"
          modifier="btn--fluid"
          type="submit"
          @click.native="submit($event)"
        />
      </div>

      <div class="form__info">
        <p>Already have an account? <strong @click="$emit('login')">LOGIN HERE</strong></p>
      </div>
    </div>
  </form>
</template>

<script>
import Input from './Input'
import Button from './Button'
import { email, minLength, required, sameAs } from 'vuelidate/lib/validators'
import { REGISTER, AUTHENTICATE } from '../../graphql'

export default {
  name: 'RegisterForm',
  components: {
    EmailInput: Input,
    PasswordInput: Input,
    ConfirmInput: Input,
    Button
  },
  data () {
    return {
      invalid: false,
      errors: [],
      form: {
        email: '',
        confirm: '',
        password: ''
      }
    }
  },
  validations: {
    form: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(3)
      },
      confirm: {
        required,
        sameAsPassword: sameAs('password')
      }
    }
  },
  computed: {
    getForm () { return this.form },
  },
  methods: {
    formModifier (validation) {
      if (validation.$error) {
        return 'input--error'
      } else if (validation.$dirty) {
        return 'input--dirty'
      }
    },
    login (credentials) {
      this.$apollo.mutate({
        mutation: AUTHENTICATE,
        variables: { ...credentials }
      })
        .then((res) => {
          if (res.data.authenticate !== '') {
            this.$store.commit('login', res.data.authenticate)
            this.$emit('close')
          }
        })
        .catch((err) => {
          this.$logger(err)
        })
    },
    handleError (err) {
      this.invalid = true
      this.errors.push(err.message)

      setTimeout(() => {
        this.invalid = false
      }, 3000)
    },
    submit (event) {
      event.preventDefault()

      if (!this.$v.$invalid) {
        console.log('submit')

        this.$apollo.mutate({
          mutation: REGISTER,
          variables: {
            email: this.form.email,
            password: this.form.password
          }
        })
          .then((res) => {
            if (res.data.register) {
              this.login({
                email: this.form.email,
                password: this.form.password
              })
            }
          })
          .catch((err) => {
            this.handleError(err)
            console.log('error', err)
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  display: block;
}
.form__container {
  display: block;
  margin: 0 auto;
  max-width: 460px;
}
.form__block {
  display: block;
  text-align: left;
  &:first-child {
    margin-bottom: 37px;
  }
  &:not(:last-child) {
    margin-bottom: 20px;
  }
}
.form__info {
  display: block;
  font-family: $montserrat;
  font-size: 18px;
  letter-spacing: 0.1em;
  margin-top: 36px;
  text-align: center;

  strong {
    text-decoration: none;
    font-weight: 700;
    color: $color-black;
    transition: color $duration $easing;
    cursor: pointer;

    &:hover {
      color: $color-black-hover;
    }
  }
}
</style>
