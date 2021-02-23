<template>
  <div class="post__update-form">
    <div class="post__actions clearfix">
      <button
        class="post__btn"
        type="button"
        @click="save($event)"
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

      <time class="post__date" :datetime="post.createdAt | format_datetime">{{ post.createdAt | format_date }}</time>
    </div>

    <div class="post__heading clearfix">
      <h1
        class="post__title post__title--edit"
        contenteditable
        placeholder="Title"
        id="title"
        @input="updateField($event, 'title')"
        @blur="$v.form.title.$touch()"
      >{{ post.title }}</h1>
    </div>

    <div
      class="post__image"
      v-if="!isNull(post.image)"
    >
      <div :style="{ backgroundImage: `url(${post.image})` }"></div>
    </div>

    <div class="post__upload">
      <label for="upload" class="upload">
        <input class="upload__input" type="file" accept="image/*" id="upload" name="upload" @change="fileChange($event)">
        <div class="upload__preview">
          <div class="upload__preview-img uploads" v-show="getPreview" id="preview"></div>
          <div class="upload__preview-img" v-show="!getPreview" :style="{ backgroundImage: `url(${post.image})` }"></div>
        </div>

        <div class="upload__btn">
          <span>UPLOAD IMAGE</span>
        </div>
      </label>
    </div>

    <div
      class="post__content post__content--edit"
      contenteditable
      placeholder="Content"
      @input="updateField($event, 'content')"
      @blur="$v.form.content.$touch()"
    >{{ post.content }}</div>

    <div class="post__footer">
      <div class="post__footer-heading">
        <h2 class="heading heading--xl">COMMENT</h2>
      </div>

      <ul class="post__comment-list">
        <li
          class="post__comment--item"
          v-for="comment in post.comments"
          :key="comment.id"
        >
          <Comment :comment="comment">
            <h3 slot="content" class="comment__content">{{ comment.content }}</h3>
          </Comment>
        </li>
      </ul>
    </div>
    <div class="post__comment-form">
      <CommentForm :id="post.id" @addComment="$emit('addComment')" />
    </div>
  </div>
</template>

<script>
import CommentForm from './CommentForm'
import Comment from './Comment'
import _ from 'lodash'
import { required } from 'vuelidate/lib/validators'
import { UPDATE_POST } from '../../graphql'

export default {
  name: 'update-post',
  props: ['post'],
  components: {
    Comment,
    CommentForm
  },
  data () {
    return {
      preview: false,
      form: {},
      temp: {}
    }
  },
  watch: {
    temp (newVal, oldVal) {
      if (newVal && !oldVal) {
        this.temp = Object.assign({}, this.post)
      }
      console.log(newVal, oldVal)
    }
  },
  validations: {
    form: {
      title: { required },
      content: {}
    }
  },
  methods: {
    isNull (data) {
      return _.isNull(data) || data === ''
    },
    fileChange (e) {
      const reader = new FileReader()
      reader.onload = function () {
        document.getElementById('upload').src = reader.result
        document.getElementById('preview')
          .setAttribute('style', `background-image: url(${reader.result})`)
      }

      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0])
        this.preview = true
      }
    },
    updateField (e, field) {
      this.form[field] = e.target.textContent
    },
    async save (e) {
      e.preventDefault()
      if (!this.$v.form.$invalid) {
        await this.$apollo.mutate({
          mutation: UPDATE_POST,
          variables: {
            post: {
              id: this.post.id,
              title: this.getForm.title,
              content: this.getForm.content,
              image: this.getForm.image
            }
          }
        })
          .then((res) => {
            this.$emit('save')
          })
          .catch((err) => { console.log(err) })
      }
    },
    cancel (e) {
      if (!_.isEqual(this.post, this.getForm)) {
        const confirm = window.confirm('Are you sure you want to discard all changes?')
        if (confirm) this.$emit('toggle')
      } else {
        this.$emit('toggle')
      }
    }
  },
  computed: {
    getForm () { return this.form },
    getTemp () { return this.temp },
    getPreview () { return this.preview },
    getUpload () { return this.upload }
  },
  mounted () {
    this.form = Object.assign({}, this.post)
  }
}
</script>
