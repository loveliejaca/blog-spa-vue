<template>
  <div
    class="slide js-slide"
    :class="modifier"
    :style="width"
  >
    <a
      :href="`/${post.id}`"
      class="slide__link"
    >
      <div
        :style="showPlaceholder(post.image)"
        class="slide__img"
      />
      <div class="slide__content">

          <div class="slide__title">{{ post.title }}</div>

        <time class="slide__date" datetime="post.createdAt | format_datetime">{{ post.createdAt | format_date }}</time>
      </div>
    </a>
  </div>
</template>


<script>
import mixins from '../../plugins/mixins'
export default {
  name: 'Slide',
  mixins: [mixins],
  props: {
    post: {
      type: Object,
      default: () => {}
    },
    modifier: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.slide {
  position: relative;
  display: flex;
  flex: 0 0 auto;
  width: 100%;
  min-height: 1px;
  height: 100%;
}
.slide__img {
  position: relative;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
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
  width: 100%;
  height: 100%;
  // margin-bottom: 22px;
}
.slide__title {
  font-weight: 700;
  font-size: 60px;
  letter-spacing: 0.01em;
  line-height: 1.55;
  padding: 8px 10px;
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
