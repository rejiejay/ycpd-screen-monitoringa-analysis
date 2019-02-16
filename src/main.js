import Vue from 'vue';

import store from './store/index';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/zh-CN'; // lang i18n

import '@/styles/index.less'; // global css

import Index from './index.vue';
import router from './router';

import animated from 'animate.css' // npm install animate.css --save安装，在引入

Vue.use(animated);

Vue.use(ElementUI, { locale });

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    store: store,
    components: { Index },
    template: '<Index/>',
    router,
});
