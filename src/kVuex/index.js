/*
 * @Author: SailorCai
 * @Date: 2020-01-05 17:38:41
 * @LastEditors  : SailorCai
 * @LastEditTime : 2020-01-05 23:24:58
 * @FilePath: /vue-deep/src/kVuex/index.js
 */
let Vue;

class Store{
    constructor(options) {
        this._mutations = options.mutations;
        this._actions = options.actions;

        // state必须是响应式的
        /* this.state = new Vue({
            data: options.state
        }); */

        this._vm = new Vue({
            data: {
                // 两个$符号，vue不会做代理，防止state被直接访问和修改。
                $$state: options.state
            }
        })

        // 绑定commit和dispatch的上下文为store
        this.commit  = this.commit.bind(this);
        this.dispatch = this.dispatch.bind(this);

    }
    get state() {
        return this._vm._data.$$state;
    }

    set state(v) {
        console.error('你造吗，你这样不好！');
    }
 
    commit(type, payload) {
        const entry = this._mutations[type];
        if(entry) {
            entry(this.state, payload);
        }
    }

    dispatch(type, payload) {
        const entry = this._actions[type];
        if(entry) {
            entry(this, payload);
        }
    }
}

function install(_Vue) {
    Vue = _Vue;

    Vue.mixin({
        beforeCreate() {
            if(this.$options.store) {
                Vue.prototype.$store = this.$options.store;
            }
        },
    });
}

export default {
    Store,
    install,
};