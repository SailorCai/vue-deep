/*
 * @Author: SailorCai
 * @Date: 2020-01-05 16:53:23
 * @LastEditors: SailorCai
 * @LastEditTime: 2020-05-18 08:15:40
 * @FilePath: /vue-deep/src/kRouter/routerView.js
 */
export default {
  name: "router-view",
  props: {},
  render(h) {
    // this.isRouterView = true;
    this.$vnode.data.routerView = true;

    // this.depth = 0;
    let depth = 0;
    // 遍历父级，获取深度
    let parent = this.$parent;
    while (parent) {
      // if (parent.isRouterView) {
      const vnodeData = parent.$vnode && parent.$vnode.data;
      if (vnodeData) {
        if (vnodeData.routerView) {
          // 说明当前parent是一个router-view
          depth++;
        }
        // this.depth++;
      }
      parent = parent.$parent;
    }
    // const { matched } = this.$router;
    // const component = matched[depth].component || null;
    let component = null;
    const route = this.$router.matched[depth];
    if (route) {
      component = route.component;
    }
    return h(component);
  }
};
