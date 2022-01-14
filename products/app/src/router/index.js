import Vue from 'vue'
import VueRouter from 'vue-router'
import Kalc1 from '../components/Kalc1.vue'
import Kalc2 from '../components/Kalc2.vue'
import Calcs from '../components/Calcs.vue'
Vue.use(VueRouter)

export default new VueRouter({
  mode:'history',
  routes: [
    {
      path: '/kalc1',
      name: 'cal1',
      component:Kalc1
    },
    {
      path: '/kalc2',
      name: 'cal2',
      component:Kalc2
    },
    {
      path: '/',
      name: 'calcs',
      component:Calcs
    }
  ]
})