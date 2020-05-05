/*
 * @Author: SailorCai
 * @Date: 2020-05-04 22:14:00
 * @LastEditors: SailorCai
 * @LastEditTime: 2020-05-04 23:26:14
 * @FilePath: /vue-deep/src/components/kForm/emitter.js
 */
function broadcast(eventName, componentName, params) {
  this.$children.forEach(child => {
    let name = child.$options.componentName;
    if (name !== componentName) {
      broadcast.call(child, eventName, componentName, params);
    } else {
      child.$emit.call(child, eventName, componentName, params);
    }
  });
}

export default {
  methods: {
    dispatch(eventName, componentName, params) {
      let parent = this.$parent || this.$root;
      let name = parent.$options.componentName;
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        name = parent.$options.componentName;
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast(evnetName, componentName, params) {
      broadcast.call(this, evnetName, componentName, params);
    }
  }
};
