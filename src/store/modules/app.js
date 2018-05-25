import Cookies from 'js-cookie';
import { otherRouter, appRouter } from '@/router/router';


const app = {
  state: {
    isCollapse: false, //  !+Cookies.get('sidebarStatus'),
    levelList: [{
      redirect: true,
      title: '首页',
      name: 'home_index',
    }],
    menuList: [
      {
        index: '1',
        name: 'home_index',
        icon: 'el-icon-menu',
        title: '测试1',
        children: [],
        isSingle: true,
      },
      {
        index: '2',
        name: 'home_index',
        icon: 'el-icon-menu',
        title: '测试2',
        children: [{
          index: '2-1',
          name: 'test',
          title: '测试2-1',
          isSingle: true,
        }, {
          index: '2-2',
          name: 'home_index',
          title: '测试2-2',
          isSingle: true,
        }],
      },
      {
        index: '3',
        name: 'home_index',
        icon: 'el-icon-menu',
        title: '测试3',
        children: [],
        isSingle: true,
      },
      {
        index: '4',
        name: 'home_index',
        icon: 'el-icon-menu',
        title: '测试4',
        children: [{
          index: '4-1',
          name: 'test',
          title: '测试4-1',
          isSingle: true,
        }, {
          index: '4-2',
          name: 'test',
          title: '测试4-2',
          isSingle: true,
        }],
      },
    ],
    routers: [
      otherRouter,
      ...appRouter,
    ],
    tagsList: [{
      title: '首页',
      path: '',
      name: 'home_index',
      isSingle: true,
      isSelect: true,
    }],
    cachePage: [],
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
    PUSH_LEVEL_LIST: (state, list) => {
      state.levelList = list;
      if (list.length === 1) {
        state.menuList.some((item) => {
          if (item.index === list[0]) {
            state.levelList = [{
              redirect: true,
              title: item.title,
              name: item.name,
            }];
            return true;
          }
          return false;
        });
      } else {
        state.menuList.some((item) => {
          if (item.index === list[0]) {
            item.children.some((childItem) => {
              if (childItem.index === list[1]) {
                state.levelList = [{
                  redirect: 'noredirect',
                  title: item.title,
                  name: item.name,
                }, {
                  redirect: true,
                  title: childItem.title,
                  name: childItem.name,
                }];
                return true;
              }
              return false;
            });
            return true;
          }
          return false;
        });
      }
    },
    CLOSE_PAGE(state, name) {
      state.cachePage.forEach((item, index) => {
        if (item === name) {
          state.cachePage.splice(index, 1);
        }
      });
    },
  },
  actions: {
    // ToggleSideBar: ({ commit }) => {
    //   commit('TOGGLE_SIDEBAR');
    // },
  },
};

export default app;
