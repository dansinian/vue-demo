import Vue from 'vue';
import iView from 'iview';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import axios from 'axios';
import Routers from './router';
import Vuex from 'vuex';
import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';

Vue.prototype.$axios = axios;
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuex);

Vue.use(iView);

// Vue.http.options.emulateJSON = true;
// Vue.http.options.headers = {
//    'Content-Type': 'application/json;charset=utf-8'
// }
// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});


const store = new Vuex.Store({
    state: {

    },
    getters: {

    },
    mutations: {

    },
    actions: {

    }
});


new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});