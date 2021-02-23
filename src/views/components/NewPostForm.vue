<template>
  <div class="post__create-form">
    <div class="post__actions clearfix">
      <button
        class="post__btn"
        type="button"
        @click="$emit('save'); save($event)"
      >
        <span class="post__btn-text">Save Post</span>
      </button>
      <button
        class="post__btn"
        type="button"
        @click="cancel($event)"
      >
        <span class="post__btn-text">Cancel</span>
      </button>

      <time class="post__date" :datetime="new Date() | format_datetime">{{ new Date() | format_date }}</time>
    </div>

    <div class="post__form">
      <form
        class="form form--post"
        action="/"
        novalidate
        @submit.prevent="submit($event)"
      >
        <div class="form__block">
          <Title
            placeholder="Title"
            modifier="textarea--title"
            v-model="$v.form.title.$model"
            @blur="$v.form.title.$touch()"
          />
        </div>
        <div class="form__block">
          <Textarea
            placeholder="Content"
            modifier="textarea--new-form"
            v-model="$v.form.content.$model"
            @blur="$v.form.content.$touch()"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Textarea from '../components/Textarea'
import _ from 'lodash'
import { required } from 'vuelidate/lib/validators'
import { ADD_POST } from '../../graphql'

export default {
  name: 'new-form',
  components: {
    Title: Textarea,
    Textarea
  },
  data () {
    return {
      form: {
        title: '',
        content: '',
        image: ''
      }
    }
  },
  validations: {
    form: {
      title: { required },
      content: { required }
    }
  },
  methods: {
    cancel (e) {
      if (!_.isEmpty(this.getForm.title) || !_.isEmpty(this.getForm.content)) {
        const confirm = window.confirm('Are you sure you want to discard all changes?')
        if (confirm) this.$router.push({ name: 'home' })
      } else {
        console.log('adf')
        this.$router.push({ name: 'home' })
      }
    },
    reset () {
      this.form = {
        title: '',
        content: '',
        image: ''
      }
    },
    async save (e) {
      e.preventDefault()
      if (!this.$v.form.$invalid) {
        await this.$apollo.mutate({
          mutation: ADD_POST,
          variables: {
            post: this.getForm
          }
        })
          .then((res) => {
            const params = { params: { id: res.data.addPost.id } }
            this.$router.push({ name: 'post-detail', ...params })
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  },
  computed: {
    getForm () { return this.form }
  }
}
</script>
