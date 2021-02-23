<template>
  <footer class="footer">
    <div class="footer__top">
      <div class="container">
        <router-link
          class="footer__logo"
          to="/"
        >
          <Logo :inverse="true" />
        </router-link>
        <p class="footer__text">
          サンプルテキストサンプル ルテキストサンプルテキストサ<br>
          ンプルテキストサンプル ルテキスト
        </p>
        <ScrollTop />
      </div>
    </div>

    <div class="footer__bottom">
      <small class="footer__copyright">Copyright©2007-2019 Blog Inc.</small>
    </div>
  </footer>
</template>

<script>
import Logo from './Logo'
import ScrollTop from '../components/ScrollTop'

export default {
  name: 'app-footer',
  components: {
    Logo,
    ScrollTop
  }
}
</script>
<style lang="scss" scoped>
.footer {
  display: block;
}
.footer__top {
  background-color: #292929;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  padding: 78px 0 63px;
}
.footer__text {
  font-size: 16px;
  font-weight: 500;
  line-height: 2;
}
.footer__bottom {
  background-color: #101010;
  text-align: center;
  padding: 34px 0;
}
.footer__logo {
  display: inline-block;
  margin-bottom: 36px;
}
.footer__btn {
  display: block;
}
.footer__copyright {
  font-family: $montserrat;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  letter-spacing: 0.1em;
}
</style>
