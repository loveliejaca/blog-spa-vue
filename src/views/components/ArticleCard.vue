<template>
  <article class="article-card">
    <a :href="`/${post.id}`" class="article-card__link">
      <div class="article-card__inner clearfix">
        <div class="article-card__thumb">
          <div :style="showPlaceholder(post.image)"></div>
        </div>
        <div class="article-card__content">
          <time
            class="article-card__date"
            :datetime="post.createdAt | format_datetime"
          >
            {{ post.createdAt | format_date }}
          </time>
          <slot name="title"></slot>
        </div>
      </div>
    </a>
  </article>
</template>

<script>
import customMixins from '../../mixins'

export default {
  name: 'article-card',
  props: ['post'],
  mixins: [customMixins]
}
</script>

<style lang="scss" scoped>
.article-card {
  display: block;
  border: 1px solid $color-black;

}
.article-card__link {
  display: block;
  text-decoration: none;
  color: $color-black;
}
.article-card__inner {
  position: relative;
  padding: 40px 29px 29px;
}
.article-card__thumb {
  margin-bottom: 23px;

  > div {
    position: relative;
    background-size: cover;
    background-position: center;
    padding-top: 71.4%;
  }
}
.article-card__content {}
.article-card__date {
  font-family: $montserrat;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.1em;
  line-height: 1.55;
  color: $color-black;
}
.article-card__title {
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0.001em;
  line-height: 1.6;
  font-weight: 700;
  margin-top: 5px;
}
.article-card__ {}
</style>
