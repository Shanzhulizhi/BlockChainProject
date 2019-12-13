/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/Login'
import mainpage from '@/components/mainpage'
import queryamount from '@/components/queryamount'
import querystate from '@/components/querystate'
import addirr from '@/components/addirr'
import shiftirr from '@/components/shiftirr'
import finance from '@/components/finance'
import payback from '@/components/payback'
import Register from '@/components/Register/Register'


Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/mainpage',
      name: 'mainpage',
      component: mainpage,
      children: [
        { name: 'queryamount', path: 'queryamount', component: queryamount },
        { name: 'querystate', path: 'querystate', component: querystate },
        { name: 'addirr', path: 'addirr', component: addirr },
        { name: 'shiftirr', path: 'shiftirr', component: shiftirr },
        { name: 'finance', path: 'finance', component: finance },
        { name: 'payback', path: 'payback', component: payback },
      ]
    },

    {
      path: '/Register',
      name: 'Register',
      component: Register,
      meta: { notNeedAuth: true }
    },

    
  ]
})



export default router