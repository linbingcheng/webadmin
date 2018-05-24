import Cookies from 'js-cookie';

const Utils = {};

Utils.login = () => {
  // 登录页登录成功后的操作，先挪到这测试
  Cookies.set('user', 'bingchenglin');
};

Utils.logout = () => {
  Cookies.remove('user');
};

Utils.replaceTitle = (title) => {
  const newtitle = title || 'WEB ADMIN';
  window.document.title = newtitle;
};

Utils.getRouterObjByName = (routers, name) => {
  if (!name || !routers || !routers.length) {
    return null;
  }
  let routerObj = null;

  routers.some((item) => {
    if (item.name === name) {
      routerObj = item;
      return true;
    }
    routerObj = Utils.getRouterObjByName(item.children, name);
    if (routerObj) {
      return true;
    }
    return false;
  });
  return routerObj;
};

Utils.toDefaultPage = (routers, name, route, next) => {
  const len = routers.length;
  let i = 0;
  let notHandle = true;
  while (i < len) {
    if (routers[i].name === name && routers[i].children && routers[i].redirect === undefined) {
      route.replace({
        name: routers[i].children[0].name,
      });
      notHandle = false;
      next();
      break;
    }
    i += 1;
  }
  if (notHandle) {
    next();
  }
};

export default Utils;
