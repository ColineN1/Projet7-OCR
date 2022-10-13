import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import LoginPage from '../pages/LoginPage.vue'
import SignupPage from '../pages/SignupPage.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupPage,
  },
  {
    path: '/HomePage',
    name: 'HomePage',
    component: HomePage,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
