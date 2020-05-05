/*
 * @Author: SailorCai
 * @Date: 2020-01-05 16:53:07
 * @LastEditors: SailorCai
 * @LastEditTime: 2020-05-05 15:41:14
 * @FilePath: /vue-deep/src/kRouter/routerLink.js
 */
export default {
  name: "router-link",
  props: {
    to: {
      type: String,
      require: true
    }
  },
  render(h) {
    return h("a", { attrs: { href: "#" + this.to } }, this.$slots.default);
  }
};
