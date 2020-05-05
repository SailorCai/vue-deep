var Vue;
class VueRouter {
  constructor(options) {
    this.$options = options;

    this.current = window.location.hash.slice(1);

    Vue.util.defineReactive(this, "matched", []);
    this.match();
    window.addEventListener("hashchange", this.onHashChange.bind(this));
    window.addEventListener("load", this.onHashChange.bind(this));
  }
  onHashChange() {
    this.current = window.location.hash.substr(1);
    this.matched = [];
    this.match();
  }

  match(routes) {
    routes = routes || this.$options.routes;

    for (const route of routes) {
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

VueRouter.install = function(_vue) {
  Vue = _vue;
  _vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
      }
    }
  });

  Vue.component("router-link", {
    props: {
      to: { type: String, required: true }
    },
    render(h) {
      return h("a", { attrs: { href: "#" + this.to } }, this.$slots.default);
    }
  });

  Vue.component("router-view", {
    render(h) {
      let depth = 0;
      this.$vnode.data.routerView = true;
      // 遍历父级，得出深度
      let parent = this.$parent;
      while (parent) {
        const vnodeData = parent.$vnode && parent.$vnode.data;
        if (vnodeData && vnodeData.routerView) {
          depth++;
        }
        parent = parent.$parent;
      }
      const matched = this.$router.matched;

      let component = null;
      const route = matched[depth];
      if (route) {
        component = route.component;
      }
      return h(component);
    }
  });
};

export default VueRouter;
