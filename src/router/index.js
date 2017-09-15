import Vue from 'vue'
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import Home from '@/components/Home'
import View from '@/components/View'
import Edit from '@/components/Edit'
import GroupsList from '@/components/GroupsList'
import GroupsEdit from '@/components/GroupsEdit'
import GroupsView from '@/components/GroupsView'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Router)
Vue.use(BootstrapVue)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/view/:id/:params?',
      name: 'View',
      component: View
    },
    {
      path: '/edit/:id?/:params?',
      name: 'Edit',
      component: Edit
    },
    {
      path: '/groups',
      name: 'GroupsList',
      component: GroupsList
    },
    {
      path: '/groups/edit/:id?',
      name: 'GroupsEdit',
      component: GroupsEdit
    },
    {
      path: '/groups/view/:id/:params?',
      name: 'GroupsView',
      component: GroupsView
    }
  ]
})
