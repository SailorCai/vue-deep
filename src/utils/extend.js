/*
 * @Author: SailorCai
 * @Date: 2020-01-01 16:59:41
 * @LastEditors: SailorCai
 * @LastEditTime: 2020-05-05 09:10:37
 * @FilePath: /vue-deep/src/utils/extend.js
 */
import Vue from "vue";
import notice from "@/components/notice.vue";

function create(component, props) {
  const Notice = Vue.extend(component);

  let notice = new Notice({ propsData: props }).$mount();

  document.body.appendChild(notice.$el);

  notice.remove = function() {
    document.body.removeChild(notice.$el);
  };

  return notice;
}

export default {
  install(Vue) {
    Vue.prototype.$notice = options => create(notice, options);
  }
};
