/*
 * @Author: SailorCai
 * @Date: 2020-01-11 11:57:23
 * @LastEditors: SailorCai
 * @LastEditTime: 2020-05-05 07:52:12
 * @FilePath: /vue-deep/src/utils/create.js
 */
import Vue from "vue";

function create(component, props) {
  const vim = new Vue({
    render: h => h(component, { props })
  }).$mount();

  document.body.appendChild(vim.$el);
  const comp = vim.$children[0];
  comp.remove = () => {
    document.body.removeChild(vim.$el);
    vim.$destroy();
  };
  return comp;
}

export default create;
