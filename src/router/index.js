import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/userEditor',

    children: [{
      path: 'userEditor',
      name: 'userEditor',
      component: () => import('@/views/dashboard/userEditor'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  // {
  //   path: '/user',
  //   component: Layout,
  //   redirect: '/user',
  //   children: [{
  //     path: 'user',
  //     name: 'user',
  //     component: () => import('@/views/dashboard/user'),
  //     meta: { title: '123', icon: 'user' }
  //   }]
  // },
  {
    path: '/teacher',
    component: Layout,
    meta: { title: '老师管理', icon: 'example' },
    redirect: '/teacher',
    children: [{
      path: 'teacher',
      name: 'teacher',
      component: () => import('@/views/teacher/teacher'),
      meta: { title: '老师管理', icon: 'user' }
    },
      {
        path: 'editor',
        name: 'editor',
        component: () => import('@/views/teacher/editor'),
        meta: { title: '添加老师', icon: 'user' }
      }]
  },
  {
    path: '/student',
    component: Layout,
    meta: { title: '学生管理', icon: 'example' },
    redirect: '/student',
    children: [{
      path: 'student',
      name: 'student',
      component: () => import('@/views/student/index'),
      meta: { title: '学生管理', icon: 'user' }
    },
      {
        path: 'editor',
        name: 'editor',
        component: () => import('@/views/student/editor'),
        meta: { title: '添加学生', icon: 'user' }
      }]
  },
  {
    path: '/classs',
    component: Layout,
    meta: { title: '班级管理', icon: 'example' },
    redirect: '/classs',
    children: [{
      path: 'classs',
      name: 'classs',
      component: () => import('@/views/classs'),
      meta: { title: '班级管理', icon: 'classs' }
    },
      {
        path: 'editor',
        name: 'editor',
        component: () => import('@/views/classs/editor'),
        meta: { title: '添加班级', icon: 'classs' }
      }]
  },
  {
    path: '/academy',
    component: Layout,
    meta: { title: '学院管理', icon: 'example' },
    redirect: 'academy',
    children: [{
      path: 'academy',
      name: 'academy',
      component: () => import('@/views/academy'),
      meta: { title: '学院管理', icon: 'academy' }
    },
      {
        path: 'editor',
        name: 'editor',
        component: () => import('@/views/academy/editor'),
        meta: { title: '添加学院', icon: 'academy' }
      }]
  },
  {
    path: '/school',
    component: Layout,
    meta: { title: '学校管理', icon: 'example' },
    redirect: 'school',
    children: [{
      path: 'school',
      name: 'school',
      component: () => import('@/views/school'),
      meta: { title: '学校管理', icon: 'school' }
    },
      {
        path: 'editor',
        name: 'editor',
        component: () => import('@/views/school/editor'),
        meta: { title: '添加学校', icon: 'school' }
      }]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
