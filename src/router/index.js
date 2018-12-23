import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/Login2'
import goodsview from '@/components/GoodsView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'helloworld',
      component: login
    },
    {
      path: '/goods',
      name: 'goods',
      component: goodsview
    }
  ]
})
