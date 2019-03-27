import Vue from 'vue'
import Router from 'vue-router'
import User from '@/components/User.vue'
import Test from '@/components/test.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'User',
      component: User
    },
    {
      path: '/test',
      name:'test',
      component:Test
    }
  ]
})
