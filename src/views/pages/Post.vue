<template>
  <div class="post">
    <Breadcrumb :url="getPost.id" :text="getBreadcrumbText()"/>

    <div class="post__body">
      <div class="l-container">
        <PostView v-if="!getEdit"
          :post="getPost"
          @toggle="toggle()"
          @addComment="fetchPost()"
        />
        <PostForm v-else-if="getEdit && getIsAuth"
          :edit="getEdit"
          :post="getPost"
          @toggle="toggle()"
          @addComment="fetchPost()"
          @save="save()"
          @cancel="edit = false"
        />
      </div>
    </div>

  </div>
</template>

<script>
import Breadcrumb from '../components/Breadcrumb'
import PostForm from '../components/PostForm'
import PostView from '../components/PostView'
import _ from 'lodash'
import { GET_POST } from '../../graphql'
import { mapGetters } from 'vuex'

export default {
  name: 'post',
  components: {
    Breadcrumb,
    PostView,
    PostForm
  },
  data () {
    return {
      edit: false,
      post: {},
      temp: {}
    }
  },
  watch: {
    getIsAuth (newVal, oldVal) {
      if (oldVal && !newVal) this.edit = false
    }
  },
  methods: {
    getBreadcrumbText () {
      if (this.getEdit) return this.getPost.title
      return this.getPost.title
    },
    async fetchPost () {
      await this.$apollo.query({
        query: GET_POST,
        fetchPolicy: 'no-cache',
        variables: {
          id: parseInt(this.$route.params.id)
        }
      })
        .then((res) => {
          this.post = res.data.post
        })
        .catch((err) => {
          console.log(err)
          this.$router.push({ name: 'home' })
        })
    },
    toggle () {
      if (!this.edit) {
        this.edit = true
        this.temp = Object.assign({}, this.getPost)
      } else {
        this.edit = false
        if (!_.isEqual(this.getTemp, this.getPost)) this.post = Object.assign({}, this.getTemp)
      }
    },
    save () {
      this.toggle()
      this.fetchPost()
    }
  },
  computed: {
    ...mapGetters(['getIsAuth']),
    getEdit () { return this.edit },
    getPost () { return this.post },
    getTemp () { return this.temp }
  },
  created () {
    this.fetchPost()
  },
  mounted () {
    this.temp = Object.assign({}, this.getPost)
  }
}
</script>
