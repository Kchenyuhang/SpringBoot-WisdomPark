import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    children: [
      /**
       * 权限管理相关路由
       */
      {
        path: '/admin',
        name: 'Admin',
        component: () => import('../views/permission/Admin.vue')
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('../views/permission/Role.vue')
      },
      /**
       * 配置管理相关路由
       */
      {
        path: 'appVersion',
        name: 'AppVersion',
        component: () => import('../views/configuration/AppVersion.vue')
      },
      {
        path: 'statement',
        name: 'Statement',
        component: () => import('../views/configuration/Statement.vue')
      },
      {
        path: 'feedback',
        name: 'Feedback',
        component: () => import('../views/configuration/Feedback.vue')
      },
      /**
       * 基础管理相关路由
       */
      {
        path: 'tower',
        name: 'Tower',
        component: () => import('../views/base/Tower.vue')
      },
      {
        path: 'room',
        name: 'Room',
        component: () => import('../views/base/Room.vue')
      },
      {
        path: 'semester',
        name: 'Semester',
        component: () => import('../views/base/Semester.vue')
      },
      {
        path: 'clazz',
        name: 'Clazz',
        component: () => import('../views/base/Clazz.vue')
      },
      {
        path: 'student',
        name: 'Student',
        component: () => import('../views/base/Student.vue')
      },
      {
        path: 'teacher',
        name: 'Teacher',
        component: () => import('../views/base/Teacher.vue')
      },
      /**
       * 账号管理相关路由
       */
      {
        path: 'account',
        name: 'Account',
        component: () => import('../views/account/Account.vue')
      },
      /**
       * 图书管理相关路由
       */
      {
        path: 'book',
        name: 'Book',
        component: () => import('../views/book/Book.vue')
      },
      {
        path: 'borrow',
        name: 'Borrow',
        component: () => import('../views/book/Borrow.vue')
      },
      /**
       * 一卡通管理相关路由
       */
      {
        path: 'card',
        name: 'Card',
        component: () => import('../views/card/Card.vue')
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import('../views/card/Order.vue')
      },
      {
        path: 'reportLoss',
        name: 'ReportLoss',
        component: () => import('../views/card/ReportLoss.vue')
      },
      /**
       * 资讯管理相关路由
       */
      {
        path: 'infoType',
        name: 'InfoType',
        component: () => import('../views/information/InfoType.vue')
      },
      {
        path: 'infoManage',
        name: 'InfoManage',
        component: () => import('../views/information/InfoManage.vue')
      },

      /**
       * 考务管理相关路由
       */
      {
        path: 'schedule',
        name: 'Schedule',
        component: () => import('../views/administration/TimmeTable.vue')
      },
      {
        path: 'examiination',
        name: 'Examination',
        component: () => import('../views/administration/Examination.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }

  // 配置二级路由操作
  // {
  //   path: '/permission',
  //   name: 'Permission',
  //   redirect: '/permission/admin',
  //   children: [
  //     {
  //       path: 'permission/admin',
  //       name: 'Admin',
  //       component: Admin
  //     },
  //     {
  //       path: 'permission/role',
  //       name: 'Role',
  //       component: () => import('../views/permission/Role.vue')
  //     }
  //   ]
  // }
]

const router = new VueRouter({
  routes
})

export default router
