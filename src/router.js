import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/pages/Home'
import Post from './views/pages/Post'
import NewPost from './views/pages/NewPost'
import _ from 'lodash'
import store from './store'
const ls = window.localStorage

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    match: true,
    component: Home
  },
  {
    path: '/new',
    name: 'new-post',
    match: true,
    meta: { isAuth: 'asdfadf' },
    component: NewPost
  },
  {
    path: '/:id',
    name: 'post-detail',
    match: true,
    component: Post
  }
]

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  init()
    .then(() => {
      if (to.name === 'new-post' && !store.getters.getIsAuth) next(routes[0])
      else if (to.name === 'post-detail' && isNaN(to.params.id)) next(routes[0])
      else next()
    })
})

async function init () {
  if (_.isEmpty(ls.getItem('sfe'))) {
    ls.setItem('sfe', JSON.stringify({ isAuth: false, user: {} }))
  } else {
    store.dispatch('INIT', JSON.parse(ls.getItem('sfe')))
  }
}

export default router
