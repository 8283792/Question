import Vue from 'vue'
import Router from 'vue-router'


import Home from '@/views/Home'
import Main from '@/views/Main'
import BoilingPoint from '@/views/BoilingPoint'
import Recommend from '@/views/Recommend'
import BackEnd from '@/views/BackEnd'
import FrontEnd from '@/views/FrontEnd'
import My from '@/views/My'
import Register from '@/views/Register'
import Publish from '@/views/Publish'
import MyPublish from '@/views/MyPublish'
import Detail from '@/views/Detail'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'recommend'
      }
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home,
          children: [
            {
              path: '/home/recommend',
              name: 'recommend',
              component: Recommend
            },
            {
              path: '/home/backEnd',
              name: 'backEnd',
              component: BackEnd
            },
            {
              path: '/home/frontEnd',
              name: 'frontEnd',
              component: FrontEnd
            }
          ]
        },
        {
          path: '/boilingPoint',
          name: 'boilingPoint',
          component: BoilingPoint,
        },
        {
          path: '/detail',
          name: 'detail',
          component: Detail,
        },
        {
          path: '/my',
          name: 'my',
          component: My,
        },
        {
          path: '/myPublish',
          name: 'myPublish',
          component: MyPublish,
        },
        {
          path: '/publish',
          name: 'publish',
          component: Publish,
        }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    }
  ]
})
