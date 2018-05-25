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


Utils.openNewPage = (vm, router) => {
  const tagsList = vm.$store.state.app.tagsList;
  let tagHasOpened = false;
  let isSingle = false;
  let prototypeNum = 0;
  tagsList.every((item, index) => {
    if (item.isSelect) {
      tagsList[index].isSelect = false;
    }
    if (item.name === router.name) {
      tagsList[index].isSelect = true;
      isSingle = item.isSingle;
      tagHasOpened = true;
      prototypeNum += 1;
    }
    return true;
  });
  if (!isSingle || !tagHasOpened) {
    tagsList.push({
      title: router.title + ((!isSingle && prototypeNum !== 0) ? `(${prototypeNum})` : ''),
      path: router.path,
      name: router.name,
      isSingle: router.isSingle,
      isSelect: true,
    });
  }
};


export default Utils;
