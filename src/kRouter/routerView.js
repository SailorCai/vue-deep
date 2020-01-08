/*
 * @Author: SailorCai
 * @Date: 2020-01-05 16:53:23
 * @LastEditors  : SailorCai
 * @LastEditTime : 2020-01-07 18:06:44
 * @FilePath: /vue-deep/src/kRouter/routerView.js
 */
export default {
    name: 'router-link',
    props: {},
    render(h) {
        // routerview组件标记自己为routerview组件
        this.$vnode.isRouterView = true;

        this.deep = 0;
        let parent = this.$parent;
        while(parent) {
            if(parent.$vnode && parent.$vnode.isRouterView) {
                this.deep++;
            }
            parent = parent.$parent;
        }

        let {routerMap} = this.$router;
        console.log(this.deep);
        let comp = routerMap[this.deep].component;
        console.log(routerMap);
        return h(comp);
    },
}