import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/article',
    name: 'Article',
    component: () => import('../views/Article')
  },
  {
    path: '/article/:id',
    name: 'ArticleId',
    component: () => import('../views/ArticleId')
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('../views/Message')
  },
  {
    path: '/link',
    name: 'Link',
    component: () => import('../views/Link')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About')
  },
  {
    path: '/userc',
    name: 'UserC',
    component: () => import('../views/UserC')
  },
  {
    path: '/adminc',
    name: 'AdminC',
    component: () => import('../views/AdminC')
  },
  {
    path: '/:all*',
    name: 'Error',
    component: () => import('../views/Error'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
