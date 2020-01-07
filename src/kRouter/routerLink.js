/*
 * @Author: SailorCai
 * @Date: 2020-01-05 16:53:07
 * @LastEditors  : SailorCai
 * @LastEditTime : 2020-01-05 17:30:34
 * @FilePath: /vue-deep/src/kRouter/routerLink.js
 */
export default {
    name: 'router-link',
    props: {
        to: {
            type: String,
            require: true,
        }
    },
    render(h) {
        return h('a', {attrs: {href: '#'+this.to}}, this.$slots.default)
    }
}