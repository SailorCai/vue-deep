/*
 * @Author: SailorCai
 * @Date: 2020-01-11 11:57:23
 * @LastEditors: SailorCai
 * @LastEditTime: 2020-05-05 23:11:33
 * @FilePath: /vue-deep/src/kRouter/kRouter.js
 */
import routerLink from "./routerLink";
import routerView from "./routerView";

var Vue;
class VueRouter {
  constructor(options) {
    this.$options = options;
    // this.routerMap = {};
    // 利用vue，把current定义成响应式
    // Vue.util.defineReactive(this, "current", "/");
    this.current = window.location.hash.slice(1) || "/";
    // this.matched = [];
    Vue.util.defineReactive(this, "matched", []);
    // match方法可以递归的遍历路由表，获得匹配数组
    this.match();

    /* options.routes.forEach(route => {
      this.routerMap[route.path] = route;
    }); */

    window.addEventListener("hashchange", this.onHashChange.bind(this));
    window.addEventListener("load", this.onHashChange.bind(this));
  }
  onHashChange() {
    let hash = window.location.hash.substr(1);
    this.current = hash;
    // 每次更新路由，清空路由表，重新匹配
    this.matched = [];
    this.match();
  }
  // 用于递归遍历路由表，获取匹配的路由
  match(router) {
    router = router || this.$options.routes;
    for (const route of router) {
      if (route.path === "/" && this.current === "/") {
        this.matched.push(route);
        return;
      }
      if (route.path !== "/" && this.current.indexOf(route.path) > -1) {
        this.matched.push(route);
        if (route.children) {
          this.match.call(this, route.children);
        }
        return;
      }
    }
  }
}
VueRouter.install = _vue => {
  Vue = _vue;

  //   全局混入
  _vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
      }
    }
  });
  Vue.component("router-link", routerLink);
  Vue.component("router-view", routerView);
};

export default VueRouter;
