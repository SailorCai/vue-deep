/*
 * @Author: SailorCai
 * @Date: 2020-01-05 11:53:02
 * @LastEditors  : SailorCai
 * @LastEditTime : 2020-01-05 12:50:22
 * @FilePath: /vue-deep/src/mixins/emitter.js
 */
// 由上向下广播事件
const broadCast = function(componentName, eventName, param) {
    this.$children.forEach(item => {
        let name = item.$options.componentName;
        if(name === componentName) {
            item.$emit.apply(item, [eventName].concat(param));
        }
        // 此处和emelentUI的实现不太一样，这里的目的是找到对应的组件后还要继续向下广播
        if(item.$children.length) {
            broadCast.call(item, componentName, eventName, param);
        }
    });
};

export default {
    methods: {
        // 由下向上派发事件
        dispatch(componentName, eventName, param) {
            let parent = this.$parent || this.$root;
            let name = parent.$options.componentName;
            while(parent && (!name || name !== componentName)) {
                parent = parent.$parent;
                if(parent) {
                    name = parent.$options.componentName;
                }
            }
            if(parent) {
                parent.$emit.apply(parent, [eventName].concat(param));
            }
        },
        broadcast(componentName, eventName, param) {
            broadCast.call(this, componentName, eventName, param);
        },
    }
};