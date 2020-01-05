/*
 * @Author: SailorCai
 * @Date: 2020-01-01 16:59:41
 * @LastEditors  : SailorCai
 * @LastEditTime : 2020-01-01 17:15:09
 * @FilePath: /hello-cli3/src/utils/extend.js
 */
import Vue from 'vue';

export default function create(component, props) {
    const Notice = Vue.extend(component);

    let notice = new Notice({propsData: props}).$mount();

    document.body.appendChild(notice.$el);

    notice.remove = function() {
        document.body.removeChild(notice.$el);
    };

    return notice;
}