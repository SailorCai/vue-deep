/*
 * @Author: SailorCai
 * @Date: 2020-01-05 16:18:45
 * @LastEditors  : SailorCai
 * @LastEditTime : 2020-01-07 18:05:35
 * @FilePath: /vue-deep/src/kRouter/index.js
 */
import routerLink from './routerLink'
import routerView from './routerView'

let Vue;

class kRouter {
    constructor(options) {
        this.$options = options;

        this.current = '/';
        Vue.util.defineReactive(this, 'routerMap', []);
    
    
        window.addEventListener('hashchange', this.onhashchange.bind(this));
        window.addEventListener('load', this.onhashchange.bind(this));

        this.match();

    }
    match(routes) {
        routes = routes || this.$options.routes;
        const router = this;
        routes.forEach(item => {
            if(item.path === '/' && item.path === router.current) {
                router.routerMap.push(item);
                return;
            }

            if(item.path !== '/' && this.current.indexOf(item.path) !== -1) {
                console.log('===============',router.current);
                router.routerMap.push(item);
            }
            if(item.children){
                 router.match(item.children);
            }
        });
    }
    onhashchange() {
        this.current = window.location.hash.slice(1);
        this.routerMap = [];
        this.match(this.routes);
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