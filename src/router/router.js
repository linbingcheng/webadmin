import Main from '@/components/Main';
import Login from '@/components/Login';


// 登陆页面
export const loginRouter = {
  path: '/login',
  name: 'login',
  component: Login,
  meta: {
    title: 'Login - 登录',
  },
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
  path: '/home',
  name: 'home',
  component: Main,
  meta: {
    title: 'Webadmin',
  },
  children: [{
    path: 'index',
    name: 'home_index',
    title: '首页',
    component: () => import('@/components/views/Index'),
  }, {
    path: 'test',
    name: 'test',
    title: '测试页面',
    component: () => import('@/components/views/TestVue'),
  }, {
    path: 'test2',
    name: 'test2',
    title: '测试页面2',
    component: () => import('@/components/views/TestVue2'),
  }, {
    path: 'test3',
    name: 'test3',
    title: '测试页面3',
    component: () => import('@/components/views/TestVue3'),
  }],
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const appRouter = {
  path: '/home',
  name: 'home',
  component: Main,
  meta: {
    title: 'Webadmin',
  },
  children: [],
};

export const homeRouter = {
  path: '/',
  name: 'home',
  redirect: '/home/index',
};

// 所有上面定义的路由都要写在下面的routers里
export const routes = [
  loginRouter,
  homeRouter,
  otherRouter,
  appRouter,
];
