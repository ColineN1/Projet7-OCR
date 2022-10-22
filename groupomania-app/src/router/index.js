import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import LoginPage from '../pages/LoginPage.vue'
import SignupPage from '../pages/SignupPage.vue'
import OnePostPage from '../pages/OnePostPage.vue'
import store from "../store"

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupPage,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/onepost/:id',
    name: 'onepost',
    component: OnePostPage,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const isPublicRoute = (name) => {
  return ['login', 'signup'].includes(name)
}

router.beforeEach((to, from, next) => {
  const isLogged = store.getters['auth/isLogged']

  if (!isPublicRoute(to.name) && !isLogged)
    next({ name: 'login' })

  next()
})


export default router
