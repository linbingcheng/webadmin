import Cookies from 'js-cookie';

const user = {
  state: {
    token: '',
    name: 'admin',
    avatar: 'http://118.24.54.181:6010/api/alien/download/e04a552b-2738-4b08-6714-5b4bbb0f2f20/6639_142441004237_2.jpg?imageProcess=resize&imageResizeM=fill&imageResizeW=100&imageResizeH=100',
    roles: [],
    messages: [],
  },
  mutations: {
    logout: () => {
      Cookies.remove('user');
      Cookies.remove('password');
      Cookies.remove('access');
      // 恢复默认样式
      const themeLink = document.querySelector('link[name="theme"]');
      themeLink.setAttribute('href', '');
      // 清空打开的页面等数据，但是保存主题数据
      let theme = '';
      if (localStorage.theme) {
        theme = localStorage.theme;
      }
      localStorage.clear();
      if (theme) {
        localStorage.theme = theme;
      }
    },
  },
  actions: {
  },
};

export default user;
