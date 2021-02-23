<template>
  <div class="hero">
    <div class="hero__inner">
      <HeroSlider :posts="posts" />
    </div>
  </div>
</template>

<script>
import { GET_PAGINATED_POSTS } from '../../graphql'
import HeroSlider from '../components/HeroSlider'

export default {
  name: 'hero',
  components: {
    HeroSlider
  },
  data () {
    return {
      posts: []
    }
  },
  apollo: {
    posts: {
      query: GET_PAGINATED_POSTS,
      variables: {
        pagination: {
          limit: 3,
          offset: 0
        }
      }
    },

  },
  computed: {
    getPosts () { return this.posts }
  }
}
</script>

<style lang="scss" scoped>
.hero {
  display: table;
  vertical-align: middle;
  width: 100%;
  height: calc(100vh - 105px);
}
.hero__inner {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
}
.hero__list {
  width: 100%;
  height: 100%;
}
.hero__item {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
}
.slide {
  position: relative;
  display: flex;
  flex: 0 0 auto;
  width: 100%;
  min-height: 1px;
  height: 100%;
}
.slide__item {
  position: relative;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
}
.slide__content {
  position: absolute;
  top: calc(50% + 5px);
  right: 130px;
  transform: translateY(-50%);
  text-align: right;
  max-width: 50%;
  z-index: 2;
}
.slide__link {
  display: block;
  margin-bottom: 22px;
}
.slide__title {
  font-weight: 700;
  font-size: 60px;
  letter-spacing: 0.01em;
  line-height: 1.55;
  padding: 8px 0 8px 20px;
  color: $color-white;
  background-color: $color-black;
}
.slide__date {
  font-family: $montserrat;
  font-size: 28px;
  letter-spacing: 0.2em;
}
//MODIFIER
.slide-clone {
  position: absolute !important;
  top: 0;
}
</style>
