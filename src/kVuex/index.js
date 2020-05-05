var Vue;
class Store {
  constructor(options) {
    this._mutations = options.mutations;
    this._actions = options.actions;
    this.getterWrapper = options.getter;
    const computed = {};

    this.getter = {};
    const store = this;
    for (const key in options.getter) {
      if (options.getter.hasOwnProperty(key)) {
        const fn = options.getter[key];
        Object.defineProperty(this.getter, key, {
          get() {
            return store._vm[key];
          }
        });
        // 计算属性不能带参数，进行一次柯里化
        computed[key] = function() {
          return fn(store.state);
        };
      }
    }

    this._vm = new Vue({
      data: {
        $$state: options.state
      },
      computed
    });
    this.commit = this.commit.bind(this);
    this.dispatch = this.dispatch.bind(this);
  }

  commit(type, payload) {
    const entry = this._mutations[type];
    if (entry) {
      entry(this.state, payload);
    }
  }
  dispatch(type, payload) {
    const entry = this._actions[type];
    if (entry) {
      entry(this, payload);
    }
  }
  get state() {
    return this._vm.$data.$$state;
  }
  set state(v) {
    throw new Error("不能直接修改state对象");
  }
}

function install(_vue) {
  Vue = _vue;
  _vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store;
      }
    }
  });
}

export default {
  Store,
  install
};
