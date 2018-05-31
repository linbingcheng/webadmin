const Utils = {};

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

Utils.gotoIndex = (vm) => {
  vm.$router.push({
    name: 'home_index',
  });
};

Utils.openNewPage = (vm, router) => {
  if (router === null) {
    return;
  }
  vm.$store.commit('PUSH_LEVEL_LIST', router.name);
  const tagsList = vm.$store.state.app.tagsList;
  let tagHasOpened = false;
  tagsList.every((item, index) => {
    if (item.isSelect) {
      tagsList[index].isSelect = false;
    }
    if (item.name === router.name) {
      tagHasOpened = true;
    }
    return true;
  });
  if (!tagHasOpened) {
    tagsList.push({
      title: router.title,
      name: router.name,
      isSelect: true,
    });
  } else {
    tagsList.every((item, index) => {
      if (item.name === router.name) {
        tagsList[index].isSelect = true;
      }
      return true;
    });
  }
};


export default Utils;
