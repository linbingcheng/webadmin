import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import user from './modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    app,
    user,
  },
  getters: {
    isCollapse: state => state.app.isCollapse,
    levelList: state => state.app.levelList,
    menuList: state => state.app.menuList,
    routers: state => state.app.routers,
    tagsList: state => state.app.tagsList,
    cachePage: state => state.app.cachePage,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    roles: state => state.user.roles,
    messages: state => state.user.messages,
  },
});

export default store;
