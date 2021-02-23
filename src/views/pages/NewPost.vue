<template>
  <div class="post">
    <Breadcrumb :url="'text'" :text="'Create New Post'" />

    <div class="post__body">
      <div class="l-container">
        <PostForm
          v-if="getIsAuth"
          :edit="false"
          @toggle="toggle()"
          @addComment="fetchPost()"
          @save="save()"
          @cancel="$router.push({ name: 'home' })"
        />
      </div>
    </div>

  </div>
</template>

<script>
import Breadcrumb from '../components/Breadcrumb'
import PostForm from '../components/PostForm'
import { mapGetters } from 'vuex'

export default {
  name: 'new-post',
  components: {
    Breadcrumb,
    PostForm
  },
  data () {
    return {
      slugs: []
    }
  },
  computed: {
    ...mapGetters(['getIsAuth'])
  }
}
</script>

<style lang="scss" scoped>
.new-post {
  display: block;
}
</style>
