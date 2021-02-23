import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  state: {
    isAuth: false,
    heroPosts: [],
    posts: [],
    user: {}
  },
  getters: {
    getIsAuth: state => state.isAuth,
    getUser: state => state.user,
    getPosts: state => state.posts,
    getHeroPosts: state => state.heroPosts
  },
  actions: {
    async AUTHENTICATE (context, data) {
      context.commit('authenticate', await data)
    },
    async ADD_HERO_POSTS (context, data) {
      context.commit('addHeroPosts', await data)
    },
    async ADD_POSTS (context, data) {
      context.commit('addPosts', await data)
    },
    async UPDATE_POST (context, data) {
      context.commit('updatePost', await data)
    },
    async CREATE_POST (context, data) {
      context.commit('createPost', await data)
    },
    async INIT (context, data) {
      context.commit('init', await data)
    },
    async LOGOUT (context, data) {
      context.commit('logout', await data)
    }
  },
  mutations: {
    authenticate (state, payload) {
      state.isAuth = payload.isAuth
      state.user = payload.user
    },
    addHeroPosts (state, payload) {
      state.heroPosts.push(...payload)
    },
    addPosts (state, payload) {
      state.posts.push(...payload)
    },
    createPost (state, payload) {
      state.posts.push(payload)
    },
    updatePost (state, payload) {
      state.posts.filter(post => {
        if (post.id === payload.id) {
          post = payload
        }
      })
    },
    init (state, payload) {
      state.isAuth = payload.isAuth
      state.user = payload.user
    },
    logout (state, payload) {
      state.isAuth = payload.isAuth
      state.user = payload.user
    }
  }
})
