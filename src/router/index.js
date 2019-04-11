import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import Logout from '@/components/logout.vue'
import Test from '@/components/test.vue'
import Map from '@/components/map.vue'
import Register from '@/components/Sign_up.vue';
import NewFavorite from '@/components/newfavorite.vue'
import Profile from '@/components/profile.vue'
import Favoritos from '@/components/favoritos.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/test',
      name:'test',
      component:Test
    },
    {
      path:'/map',
      name:'map',
      component:Map
    },
    {
      path: '/register',
      name:'register',
      component:Register
    },
    {
      path:'/newfavorite',
      name:'newfavorite',
      component:NewFavorite
    },
    {
      path:'/profile',
      name:'profile',
      component:Profile
    },
    {
      path:'/logout',
      name:'logout',
      component:Logout
    },
    {
      path:'/favoritos',
      name:'favoritos',
      component:Favoritos
    }
  ]
})
