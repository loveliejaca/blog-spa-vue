<template>
  <form
    class="comment-form"
    action="/"
    novalidate
    @submit.prevent="submit($event)"
  >
    <div class="comment-form__block">
      <Textarea
        class="textarea--comment-form"
        placeholder="Write Comment"
        :modifier="formModifier($v.form.content)"
        name="content"
        id="content"
        v-model.trim="$v.form.content.$model"
        @blur="$v.form.content.$touch()"
      />
    </div>

    <div class="comment-form__block">
      <Button
        type="submit"
        text="SUBMIT"
        modifier="btn btn--comment-submit"
      />
    </div>
  </form>
</template>

<script>
import Textarea from './Textarea'
import Button from './Button'
import { required } from 'vuelidate/lib/validators'
import { ADD_COMMENT } from '../../graphql'

export default {
  name: 'comment-form',
  props: ['id'],
  components: {
    Textarea,
    Button
  },
  data () {
    return {
      form: {
        postId: this.id,
        content: ''
      }
    }
  },
  validations: {
    form: {
      postId: { required },
      content: { required }
    }
  },
  watch: {
    id () {
      this.form.postId = this.id
    }
  },
  methods: {
    formModifier (validation) {
      return {
        'textarea--error': validation.$error,
        'textarea--dirty': validation.$dirty
      }
    },
    async addComment () {
      await this.$apollo.mutate({
        mutation: ADD_COMMENT,
        variables: {
          postId: this.getForm.postId,
          content: this.getForm.content
        }
      })
        .then((res) => {
          this.$emit('addComment')
          this.form.content = ''
        })
        .catch((err) => {
          console.log(err)
        })
    },
    submit (e) {
      e.preventDefault()
      if (!this.$v.form.$invalid) {
        this.addComment()
      }
    }
  },
  computed: {
    getForm () { return this.form }
  }
}
</script>

<style lang="scss" scoped>
.comment-form {
  display: block;
}
.comment-form__block {
  display: block;

  &:not(:last-child) {
    padding-bottom: 35px;
  }

  &:last-child {
    text-align: right;
  }
}
</style>
