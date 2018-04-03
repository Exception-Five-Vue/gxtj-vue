import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Article from '@/views/Article'
import Login from '@/views/Login'
import Register from '@/views/register'
import TypeArticleList from '@/views/TypeArticleList'
import UserMod from '@/views/UserMod'
import Search from '@/views/Search'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/article/:id',
      name: 'Article',
      component: Article
    },
    {
      path: '/type/:typeId',
      name: 'typeList',
      component: TypeArticleList
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/usermod',
      name: 'usermod',
      component: UserMod
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
  ]
})
