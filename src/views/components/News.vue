<template>
  <div class="news">
    <div class="l-container">
      <div class="news__heading clearfix">
        <div class="news__heading-left">
          <h2 class="news__title heading heading--xl">NEWS</h2>
        </div>

        <div class="news__heading-right">
          <router-link
            v-if="getIsAuth"
            to="/new" class="news__btn" type="button">
            <span class="news__btn-text">Create New Post</span>
          </router-link>
        </div>
      </div>

      <div class="news__list">
        <ul class="row news__list-inner">
          <li
            class="col-lg--4 news__list-item"
            v-for="(post, i) in getPosts"
            :key="i"
          >
            <ArticleCard :post="post">
              <h2 slot="title" class="article-card__title">{{ post.title }}</h2>
            </ArticleCard>
          </li>
        </ul>
      </div>

      <div class="news__cta">
        <Button
          text="LOAD MORE"
          type="'button'"
          @click.native="loadMore($event)" />
      </div>
    </div>
  </div>
</template>

<script>
import ArticleCard from './ArticleCard'
import Button from './Button'
import { mapGetters } from 'vuex'
import { GET_PAGINATED_POSTS } from '../../graphql'

export default {
  name: 'news',
  components: {
    ArticleCard,
    Button
  },
  data () {
    return {
      max: false,
      pagination: {
        limit: 6,
        offset: 3
      }
    }
  },
  methods: {
    loadMore (event) {
      event.preventDefault()
      if (!this.getMax) {
        this.pagination.offset += 6
        this.fetchPosts()
      }
    },
    async fetchPosts (init = false) {
      await this.$apollo.query({
        query: GET_PAGINATED_POSTS,
        variables: {
          pagination: this.getPagination
        }
      })
        .then((response) => {
          this.$store.dispatch('ADD_POSTS', response.data.posts)
          if (!init && response.data.posts.length < 6) {
            this.max = true
          }
        })
    }
  },
  computed: {
    ...mapGetters(['getPosts', 'getIsAuth']),
    getMax () { return this.max },
    getPagination () { return this.pagination }
  },
  created () {
    this.fetchPosts(true)
  }
}
</script>

<style lang="scss" scoped>
.news {
  display: block;
  max-width: 1200px;
  margin: 0 auto;
}
.news__list {
  margin: 0 -24px;
}
.news__list-inner {}
.news__list-item {
  padding: 0 24px;
  margin-bottom: 60px;
}
.news__cta {
  display: block;
  margin: 0 auto;
  padding: 50px 0;
  text-align: center;
}
.news__title {
  float: left;
  line-height: 1;
}
.news__heading {
  display: block;
  padding: 103px 0 70px;
}
.news__heading-left {
  float: left;
}
.news__heading-right {
  float: right;
  padding-top: 12px;
}
.news__btn { display: inline-block;
  background-color: transparent;
  border: 0;
  outline: none;
  text-decoration: none;
}
.news__btn-text {
  font-family: $montserrat;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: $color-black;
}
</style>
