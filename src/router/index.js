import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
    /**
     * 首页
     */
    {
        path: '/index',
        alias: ['/', '/home'],
        name: 'home',
        component: () => import('@/views/index'),
        meta: { title: '金车管家' },
    }, 
];

let router = new Router({
    // mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    if (to.meta.title) { // 路由发生变化修改页面 title
        document.title = to.meta.title;
    }
    
    next();
});

export default router;
