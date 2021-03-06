import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import goodsview from '@/components/GoodsView'
import requestortag from '@/components/RequestorTag'
import shopcreate from '@/components/ShopCreate'
import requestorrecord from '@/components/RequestorRecord'


import usertag from '@/components/UserTag'
import order from '@/components/Order'
import orderdetail from '@/components/OrderDetail'
import userrecord from '@/components/UserRecord'
import personal from '@/components/Personal'

import admintag from '@/components/AdminTag'
import check from '@/components/Check'
import checkII from '@/components/CheckII'
import checkIII from '@/components/CheckIII'
import analysis from '@/components/Analysis'

import test from '@/components/test'

import main from '@/components/Main'

import login from '@/components/Login'
import register from '@/components/Register'
import mainPage from '@/components/MainPage'
import home from '@/components/Home'

import address from '@/components/Address'
import shopdetail from '@/components/ShopDetail'
import personalcenter from '@/components/PersonalCenter'
import personalOrder from '@/components/PersonalOrder'

import checkout from '@/components/Checkout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: checkout
    },
    {
      path: '/shopdetail',
      name: 'shopdetail',
      component: shopdetail
    },
    {
      path:'/personalorder',
      name:'personalorder',
      component:personalOrder
    },
    {
      path:'/personalcenter',
      name:'personalcenter',
      component:personalcenter
    },
    {
      path: '/address',
      name: 'address',
      component: address
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/mainPage',
      name: 'mainPage',
      component: mainPage
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/main',
      name: 'main',
      component: main
    },
    {
      path: '/goods',
      name: 'goods',
      component: goodsview
    },
    {
      path: '/admin',
      name: 'admin',
      component: admintag,
      redirect:'/check',
      children:[
        {
          path: '/check',
          name:'check',
          component:check
        },
        {
          path: '/checkII',
          name:'checkII',
          component:checkII
        },
        {
          path: '/checkIII',
          name:'checkIII',
          component:checkIII
        },
        {
          path: '/analysis',
          name:'analysis',
          component:analysis
        },
        {
          path:'*',
          redirect:'/check'
        }
      ]
    },
    {
      path: '/requestor',
      name: 'requestor',
      component: requestortag,
      redirect:'/shopcreate',
      children:[
        {
          path: '/shopcreate',
          name:'shopcreate',
          component:shopcreate
        },
        {
          path: '/requestorrecord',
          name:'requestorrecord',
          component:requestorrecord
        },
        {
          path:'*',
          redirect:'/shopcreate'
        }
      ]
    },
    {
      path: '/user',
      name: 'user',
      component: usertag,
      redirect:'/order',
      children:[
        {
          path: '/order',
          name:'order',
          component:order
        },
        {
          path: '/orderdetail',
          name:'orderdetail',
          component:orderdetail
        },
        {
          path: '/userrecord',
          name:'userrecord',
          component:userrecord
        },
        {
          path: '/personal',
          name:'perosnal',
          component:personal
        },
        {
          path:'*',
          redirect:'/order'
        }
      ]
    }
  ]
})
