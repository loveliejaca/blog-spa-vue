<template>
  <div class="scroll-top">
    <a
      class="scroll-top__btn js-scroll"
      href="#"
      @click="scrollTop()"
    >
      <span class="scroll-top__icon" />
      <span class="scroll-top__text">TOP</span>
    </a>
  </div>
</template>

<script>
import SmoothScroll from 'smooth-scroll'

export default {
  name: 'ScrollTop',
  methods: {
    scrollTop () {

      SmoothScroll('.js-scroll', {
        speed: 300,
        speedAsDuration: true
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.scroll-top {
  display: inline;
  position: absolute;
  bottom: -63px;
  right: 40px;
}
.scroll-top__btn {
  display: inline-block;
  text-decoration: none;
  width: 70px;
  height: 70px;
  background-color: $color-white;
  text-align: center;
}
.scroll-top__icon {
  display: inline-block;
  position: relative;
  min-width: 16px;
  min-height: 8px;
  margin-top: 18px;
  margin-bottom: 9px;

  &:before, &:after {
    position: absolute;
    content: "";
    min-width: 3px;
    min-height: 12px;
    background-color: $color-black;
  }

  &:before {
    bottom: -4px;
    left: 11px;
    transform: rotate(-45deg);
  }
  &:after {
    top: 0;
    left: 4px;
    transform: rotate(45deg);
  }
}
.scroll-top__text {
  display: block;
  font-family: $montserrat;
  font-weight: 700;
  font-size: 16px;
  color: $color-black;
  letter-spacing: 0.08em;
}
</style>
