import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import library from '../assets/js/library'
import store from '../store'
const routes = [
  {
    path: '/',
    name: '登录',
    component: () =>
      import('../views/login.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/404',
    name: '错误页面',
    component: () =>
      import('../views/404.vue'),
    meta: {
      title: '页面丢失',
    },
  },
];

let requestMenuTree = function () {//请求 菜单树
  library.ajaxRequest({
    way: 'systemManage/main/showSubMenuForBdis',
    parameter: '',
    success: response => {
      let data = {};
      if (response.success) {
        data = JSON.parse(JSON.stringify(response.message));
      }
      store.commit('setUserData', data);
      setRouterArr(data.menuVOList);
    }
  })
};
let setRouterArr = function (arr) {//赋值路由
  if (!arr) return;
  let myRouter = [{
    path: '/index',
    name: '首页',
    component: () =>
      import('../views/About.vue'),
    children: [],
  }];
  recursionArr(arr, myRouter[0].children);
  router.addRoutes(myRouter);
};
let recursionArr = function (arr, container) {//递归
  arr.forEach((index, n) => {
    let urlArr = index.menu_url.split('/');
    let path = urlArr[urlArr.length - 1].toLowerCase();
    let name = index.menu_name;
    container.push({
      path: path,
      name: name,
      component: () =>
        import('../components/' + path + '.vue'),
    })


    if (index.is_leaf === '0' && index.menu_id !== 20348) {
      if (index.menu_parent === 20350) {
        container[n + 1].children = [];
        recursionArr(index.children, container[n + 1].children)
      }
      else {
        container[n].children = index.menu_id === 20350 ? container[n].children : [];
        recursionArr(index.children, container[n].children)
      }
    }
  })
};

let systemName = '';

// 请求title
library.ajaxRequest({
  way: 'GetVariableData/getValue',
  parameter: {
    name: 'SYSTEM_NAME'
  },
  success: response => {
    if (response.state)
      systemName = response.message;
    store.dispatch('setSystemName', systemName);
  }
})

const createRouter = () => new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'on',
  routes
})
const router = createRouter();

router.beforeEach((to, from, next) => {
  if (to.path === '/' || to.name === '错误页面') {
    if (from.path !== '/') router.matcher = createRouter().matcher;
    library.ajaxRequest({
      way: 'login/logout',
      parameter: '',
      dataType: '',
    })
  }
  if (from.path.indexOf(to.path) < 0 || to.path === '/' || from.path === to.path) {
    store.dispatch('hideSlider');
  }
  next(from.path.indexOf(to.path) < 0 || to.path === '/' || from.path === to.path);
  document.title = to.meta.title ? to.meta.title : systemName;
})

if (window.location.hash !== '#/' && window.location.hash !== '#/404')
  requestMenuTree();

export default router
