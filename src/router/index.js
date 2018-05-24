import Vue from 'vue';
import VueRouter from 'vue-router';
import { routes } from '@/router/router';
import Cookies from 'js-cookie';

Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
  routes,
  // mode: 'history',
  // routes: [
  //   {
  //     path: '/',
  //     redirect: '/home',
  //   },
  //   {
  //     path: '/login',
  //     name: 'login',
  //     component: login,
  //   },
  //   {
  //     path: '/home',
  //     name: 'home',
  //     component: Main,
  //   },
  // ],
};


const router = new VueRouter(RouterConfig);

// let isLogin = true;
router.beforeEach((to, from, next) => {
  // 此处可以进行各种判断区分权限是否跳转到main页面还是跳转到登录页面或者错误页面
  // 一般判断cookie,注意防止死循环，因为next会重新触发beforEach
  // 登录判断
  if (!Cookies.get('user') && to.name !== 'login') {
    next({
      replace: true,
      name: 'login',
    });
  } else if (Cookies.get('user') && to.name === 'login') {
    next({
      replace: true,
      name: 'home_index',
    });
  } else {
    next();
  }
});


router.afterEach((to) => {
  console.log(router.app);
  console.log(to.name);
  console.log(to.params);
  console.log(to.query);
  console.log('finish');
  window.scrollTo(0, 0);
});

export default router;
