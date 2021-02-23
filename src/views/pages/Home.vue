<template>
  <main class="l-main">
    <Hero />
    <News />
  </main>
</template>

<script>
import Hero from '../components/Hero'
import News from '../components/News'

export default {
  name: 'home',
  components: {
    Hero,
    News
  }
}
</script>
