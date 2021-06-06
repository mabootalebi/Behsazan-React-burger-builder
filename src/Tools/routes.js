import { lazy } from 'react';

const OrderList = lazy(() => import('../Container/OrderList/OrderList'));
const SignUp = lazy(() => import('../Container/SignUp/SignUp'));
const BurgerBuilder = lazy(() => import('../Container/burderBuilder/BurgerBuilder'));
const Login = lazy(() => import('../Container/Login/Login'));
const OrderDetail = lazy(() => import('../Container/OrderDetail/OrderDetail'));
const AccessDenied = lazy(() => import('../Container/CustomErrorPages/AccessDenied/AccessDenied'));

const routes = [
    {
        path: '/OrderList',
        component: OrderList
    },
    {
        path: '/SignUp',
        component: SignUp
    },
    {
        path: '/BurgerBuilder',
        component: BurgerBuilder
    },
    {
        path: '/Login',
        component: Login
    },
    {
        path: '/OrderDetail/:id',
        component: OrderDetail
    },
    {
        path: '/AccessDenied',
        component: AccessDenied
    }
];

export default routes;