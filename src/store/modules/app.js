import Cookies from 'js-cookie';
import { otherRouter, appRouter } from '@/router/router';


const app = {
  state: {
    isCollapse: false, //  !+Cookies.get('sidebarStatus'),
    levelList: [{
      redirect: true,
      title: '首页',
      name: 'index',
      index: '1',
    }],
    menuList: [
      {
        index: '1',
        name: 'index',
        icon: 'el-icon-menu',
        title: '测试1',
        children: [],
      },
      {
        index: '2',
        name: 'index',
        icon: 'el-icon-menu',
        title: '测试2',
        children: [{
          index: '2-1',
          name: 'test',
          title: '测试2-1',
        }, {
          index: '2-2',
          name: 'test2',
          title: '测试2-2',
        }],
      },
    ],
    routers: [
      otherRouter,
      appRouter,
    ],
    tagsList: [{
      title: '首页',
      name: 'home_index',
      isSelect: true,
    }],
  },
  mutations: {
    TOGGLE_SIDEBAR: (state) => {
      if (state.isCollapse) {
        Cookies.set('sidebarStatus', 1);
      } else {
        Cookies.set('sidebarStatus', 0);
      }
      state.isCollapse = !state.isCollapse;
    },
    PUSH_LEVEL_LIST: (state, name) => {
      let existRount = false;
      let hasChildrenFlag = false;
      // 遍历所有的router 查找 router 的title 设置给面包屑
      // 后期修改应该是遍历 router.js 中的appRouter 和 otherRouter 查找 title
      if (name === 'home_index') {
        state.levelList = [{
          redirect: true,
          title: '首页',
          name: 'index',
        }];
        existRount = true;
      }
      if (!existRount) {
        state.menuList.some((item) => {
          if ((item.children === undefined || item.children.length === 0)) {
            if (item.name === name) {
              state.levelList = [{
                redirect: true,
                title: item.title,
                name: item.name,
              }];
              existRount = true;
              return true;
            }
            return false;
          }
          item.children.some((childItem) => {
            if (childItem.name === name) {
              state.levelList = [{
                redirect: 'noredirect',
                title: item.title,
                name: item.name,
              }, {
                redirect: true,
                title: childItem.title,
                name: childItem.name,
              }];
              existRount = true;
              hasChildrenFlag = true;
              return true;
            }
            return false;
          });
          return hasChildrenFlag;
        });
      }
      if (!existRount) {
        // 此处遍历其他任何存在的router
      }
    },
  },
  actions: {
    // ToggleSideBar: ({ commit }) => {
    //   commit('TOGGLE_SIDEBAR');
    // },
  },
};

export default app;
