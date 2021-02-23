<template>
  <header class="l-header">
    <div class="header">
      <div class="header__left">
        <router-link
          class="header__logo"
          to="/"
        >
          <Logo />
        </router-link>
      </div>

      <div class="header__right">
        <button
          class="header__btn"
          type="button"
          @click="logout()"
          v-if="getIsAuth"
        >
          <span class="header__btn-text">LOGOUT</span>
        </button>

        <button
          class="header__btn"
          type="button"
          @click="toggle();"
          v-else
        >
          <span class="header__btn-text">{{ getBtnText }}</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import Logo from '../components/Logo'
import { mapGetters } from 'vuex'
const ls = window.localStorage

export default {
  name: 'app-header',
  components: {
    Logo
  },
  data () {
    return {
      showModal: false,
      btnText: 'LOGIN'
    }
  },
  methods: {
    logout () {
      if (this.$route.name === 'new-post') this.$router.push({ name: 'home' })
      const payload = { isAuth: false, user: {} }
      this.$store.dispatch('LOGOUT', payload)
      this.btnText = 'LOGIN'
      this.showModal = false
      ls.setItem('sfe', JSON.stringify({ isAuth: false, user: {} }))
    },
    toggle () {
      if (!this.showModal) {
        this.showModal = true
        this.btnText = 'CLOSE'
        return this.$emit('show')
      } else {
        this.showModal = false
        this.btnText = 'LOGIN'
        return this.$emit('close')
      }
    }
  },
  computed: {
    ...mapGetters(['getIsAuth', 'getUser']),
    getCredentials () {
      return {
        isAuth: this.getIsAuth,
        user: this.getUser
      }
    },
    getShowModal () { return this.showModal },
    getBtnText () { return this.btnText }
  },
  mounted () {
    document.addEventListener('keydown', (e) => {
      if (this.showModal && e.keyCode === 27) {
        this.showModal = false
        this.btnText = 'LOGIN'
        this.$emit('close')
      }
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
