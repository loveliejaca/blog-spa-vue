<template>
  <div class="logo">
    <img v-if="inverse" :src="dark" :alt="alt">
    <img v-else :src="light" :alt="alt">
  </div>
</template>

<script>
export default {
  name: 'logo',
  props: ['inverse', 'alt'],
  data () {
    return {
      light: require('../../assets/images/logo.png'),
      dark: require('../../assets/images/logo-inverse.png')
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  display: inline-block;
  height: 30px;
  width: auto;

  img {
    max-width: 100%;
    width: 100%;
  }
}
</style>
