/*
 * @Author: SailorCai
 * @Date: 2020-01-05 15:39:58
 * @LastEditors  : SailorCai
 * @LastEditTime : 2020-01-05 17:23:40
 * @FilePath: /vue-deep/src/router/index.js
 */
import VueRouter from '@/kRouter'
import Vue from 'vue'


Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: () => import('@/components/HelloWorld.vue'),
    },
    {
        path: '/about',
        component: () => import('@/components/about.vue'),
    },
];

export default new VueRouter({
    routes
});