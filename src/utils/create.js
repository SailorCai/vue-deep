/*
 * @Author: SailorCai
 * @Date: 2020-01-01 11:11:41
 * @LastEditors  : SailorCai
 * @LastEditTime : 2020-01-01 12:00:10
 * @FilePath: /hello-cli3/src/utils/create.js
 */
import Vue from 'vue';

export default function create(Component, props) {
    let vm = new Vue({
        render: h => h(Component, {props}),
    }).$mount();

    document.body.appendChild(vm.$el);
    const comp = vm.$children[0];
    comp.remove = function() {
        document.body.removeChild(vm.$el);
        vm.$destroy();
    };

    return comp;
}