/*
 * @Author: SailorCai
 * @Date: 2020-01-05 15:39:58
 * @LastEditors  : SailorCai
 * @LastEditTime : 2020-01-07 17:12:35
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
        children: [
            {
                path: 'info',
                component: {
                    render(h) {
                        return h('div','这里是关于info页面');
                    },
                }
            }
        ],
    },
];

export default new VueRouter({
    routes
});