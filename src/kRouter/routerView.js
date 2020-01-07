/*
 * @Author: SailorCai
 * @Date: 2020-01-05 16:53:23
 * @LastEditors  : SailorCai
 * @LastEditTime : 2020-01-05 17:12:03
 * @FilePath: /vue-deep/src/kRouter/routerView.js
 */
export default {
    name: 'router-link',
    props: {},
    render(h) {
        let {routerMap, current} = this.$router;
        let comp = routerMap[current].component;
        return h(comp);
    },
}