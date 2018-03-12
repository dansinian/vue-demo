 import Login from './views/login.vue'
 import Fff from './views/fff.vue'
 import Travel from './views/index.vue'
 import Seller from './components/Seller.vue'
 import User from './components/User.vue'
 import Carousel from './components/Carousel.vue'

// const routers = [{
//     path: '/',
//     meta: {
//         title: ''
//     },
//     component: (resolve) => require(['./views/login.vue'], resolve)
// }];

const routers = [
    {
        path:'/',
        name:'Login',
        component:Login
    },
    {
        path:'/ff',
        name:'Fff',
        component:Fff
    },
    {
        path:'/travel',
        name:'Travel',
        component:Travel,
        children:[
            {
                path:'user',
                component:User
            },
            {
                path:'seller',
                component:Seller
            },
            {
                path:'carousel',
                component:Carousel,
            }
        ]
    }
];

export default routers;
