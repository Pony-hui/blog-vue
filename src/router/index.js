import Vue from 'vue'
import Router from 'vue-router'
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading
/* layout */
import Layout from '../views/layout/Layout'

const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)
export const constantRouterMap = [
  {path: '/login', component: _import('login/index'), hidden: true},
  {path: '/404', component: _import('404'), hidden: true},
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [{
      path: 'dashboard', 
      component: _import('dashboard/index')
    }]
  }
]
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
export const asyncRouterMap = [
  {
    path: '/system',
    component: Layout,
    // redirect: '/system/article',
    name: '文章管理',
    meta: {title: '文章管理', icon: 'tree'},
    children: [
      {
        path: 'write',
        name: '发布文章',
        component: _import('article/writeArticle'),
        meta: {title: '发布文章', icon: 'write'},
        menu: 'article'
      },
      {
        path: 'article',
        name: '文章列表',
        component: _import('article/article'),
        meta: {title: '文章列表', icon: 'articleList'},
        menu: 'article'
      },
      {
        path: 'type',
        name: '文章分类',
        component: _import('article/type'),
        meta: {title: '文章分类', icon: 'write'}
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/',
    name: '',
    meta: {title: '用户权限', icon: 'table'},
    children: [
      {
        path: '',
         name: '用户列表',
          component: _import('user/user'), 
          meta: {title: '用户列表', icon: 'user'}, 
          menu: 'user'
      },
      {
        path: 'role',
        name: '权限管理',
        component: _import('user/role'),
        meta: {title: '权限管理', icon: 'password'},
        menu: 'role'
      },
    ]
  },
  {
    path: '/sys',
    component: Layout,
    // redirect: '/log/menuList',
    name: '系统管理',
    meta: {title: '系统管理', icon: 'tree'},
    children: [
      {
        path: 'sysDic',
        name: '业务字典',
        component: _import('menu/menu'),
        meta: {title: '业务字典', icon: 'articleList'},
      },
      {
        path: 'sysMenu',
        name: '菜单管理',
        component: _import('menu/menu'),
        meta: {title: '菜单管理', icon: 'articleList'},
      },
    ]
  },
  // {
  //   path: '/menu',
  //   component: Layout,
  //   redirect: '/menu/menuList',
  //   name: '菜单管理',
  //   meta: {title: '菜单管理', icon: 'tree'},
  //   children: [
  //     {
  //       path: 'menu',
  //       name: '菜单列表',
  //       component: _import('menu/menu'),
  //       meta: {title: '菜单列表', icon: 'articleList'},
  //       menu: 'menu'
  //     }
  //   ]
  // },
  {
    path: '/log',
    component: Layout,
    // redirect: '/log/menuList',
    name: '系统日志',
    meta: {title: '系统日志', icon: 'tree'},
    children: [
      {
        path: 'loginLog',
        name: '登录日志',
        component: _import('log/index'),
        meta: {title: '登录日志', icon: 'articleList'},
      },
      {
        path: 'optLog',
        name: '操作日志',
        component: _import('log/index'),
        meta: {title: '操作日志', icon: 'articleList'},
      },
      {
        path: 'visitLog',
        name: '访问日志',
        component: _import('log/index'),
        meta: {title: '访问日志', icon: 'articleList'},
      },
      {
        path: 'errorLog',
        name: '异常日志',
        component: _import('log/index'),
        meta: {title: '异常日志', icon: 'articleList'},
      }
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]
