let vue;

class VueRouter {
  constructor(options) {
    this.$options = options;
    this.current = window.location.hash.substr(1) || "/";
    vue.util.defineReactive(this, "matched", []);
    this.match();
    window.addEventListener("hashchange", this.onHashChange.bind(this));
    window.addEventListener("load", this.onHashChange.bind(this));
  }
  onHashChange() {
    this.current = window.location.hash.slice(1) || "/";
    this.matched = [];
    this.match();
  }
  match(routes) {
    routes = routes || this.$options.routes;
    for (const route of routes) {
      if (this.current === "/" && route.path === "/") {
        this.matched.push(route);
        return;
      }
      if (route.path !== "/" && this.current.indexOf(route.path) > -1) {
        this.matched.push(route);
        if (route.children) {
          this.match.call(this, route.children);
        }
      }
    }
  }
}

VueRouter.install = function(_vue) {
  vue = _vue;
  _vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        _vue.prototype.$router = this.$options.router;
      }
    }
  });

  _vue.component("router-link", {
    name: "router-link",
    props: {
      to: { type: String, required: true }
    },
    render(h) {
      return h("a", { attrs: { href: "#" + this.to } }, this.$slots.default);
    }
  });

  _vue.component("router-view", {
    name: "router-view",
    props: {},
    render(h) {
      let depth = 0;
      this.$vnode.data.viewRouter = true;
      let parent = this.$parent;
      while (parent) {
        let vnodeData = parent.$vnode && parent.$vnode.data;
        if (vnodeData && vnodeData.viewRouter) {
          depth++;
        }
        parent = parent.$parent;
      }
      let component = null;
      let route = this.$router.matched[depth];
      if (route) {
        component = route.component;
      }
      return h(component);
    }
  });
};

export default VueRouter;
