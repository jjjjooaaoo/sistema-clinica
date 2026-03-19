import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/Login.vue'
import AgendarConsulta from '../views/AgendarConsulta.vue'
import Admin from '../views/Admin.vue'

const routes = [
  {
    path: "/",
    component: Login
  },
  {
    path: "/consulta",
    component: AgendarConsulta
  },
  {
    path: "/agendar",
    component: AgendarConsulta
  },
  {
    path: "/admin",
    component: Admin
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router