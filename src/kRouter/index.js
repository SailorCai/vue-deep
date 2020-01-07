/*
 * @Author: SailorCai
 * @Date: 2020-01-05 16:18:45
 * @LastEditors  : SailorCai
 * @LastEditTime : 2020-01-05 17:37:54
 * @FilePath: /vue-deep/src/kRouter/index.js
 */
import routerLink from './routerLink'
import routerView from './routerView'

let Vue;

class kRouter {
    constructor(options) {
        this.$options = options;
    
        Vue.util.defineReactive(this, 'current', '/');
    
        window.addEventListener('hashchange', this.onhashchange.bind(this));
        window.addEventListener('load', this.onhashchange.bind(this));


        this.routerMap = {};
        this.$options.routes.forEach(item => {
            this.routerMap[item.path] = item;
        });
    }

    onhashchange() {
        this.current = window.location.hash.slice(1);
    }


}

kRouter.install = function(_Vue) {
    Vue = _Vue;

    Vue.mixin({
        // 这里混入的方法是每个vue实例都会执行的
        beforeCreate() {
            // 这个判断保证只有根实例才执行
            if(this.$options.router) {
                Vue.prototype.$router = this.$options.router;
            }
        },
    });

    Vue.component('routerLink', routerLink);
    Vue.component('routerView', routerView);
};

export default kRouter;