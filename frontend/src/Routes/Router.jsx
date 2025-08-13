import { Navigate, createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import PrivateRoute from './PrivateRoute';

import Root from '../pages/Root/Root';
import HomePage from '../pages/HomePage/HomePage';
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import MyOrderSkeleton from "../components/LoadingSkeletons/MyOrderSkeleton";
import { SettingSkeleton } from "../components/Skeletons/SettingSkeleton";

const About = lazy(() => import('../pages/About/About'));
const Contact = lazy(() => import('../pages/Contact/Contact'));
const Checkout = lazy(() => import("../pages/CheckOut/Checkout"));
const Carts = lazy(() => import("../pages/Carts/Carts"));
const ProductDetailsPage = lazy(() => import("../pages/ProductDetailsPage/ProductDetailsPage"));
const CashOnDelivery = lazy(() => import("../pages/CashOnDelivery/CashOnDelivery"));
const BankOrMFS = lazy(() => import('../pages/BankOrMFS/BankOrMFS'));
const PaymentSuccess = lazy(() => import('../components/PaymentSuccess/PaymentSuccess'));
const PaymentCancel = lazy(() => import('../components/PaymentCanceled/PaymentCanceled'));
const MyOrders = lazy(() => import('../pages/MyOrders/MyOrders'));
const Wishlists = lazy(() => import("../pages/Wishlist/Wishlists"));
const Settings = lazy(() => import('../pages/Settings/Settings'));
const Profile = lazy(() => import('../components/Settings/Profile/Profile'));
const PasswordSecurity = lazy(() => import('../components/Settings/Password&Security/Password&Security'));
const Appearance = lazy(() => import('../components/Settings/Appearance/Appearance'));
const Notifications = lazy(() => import('../components/Settings/Notifications/Notifications'));
const Display = lazy(() => import('../components/Settings/Display/Display'));


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <HomePage></HomePage>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/about',
                element: <Suspense fallback={<MyOrderSkeleton/>}><About/></Suspense>
            },
            {
                path: '/contact',
                element: <Suspense fallback={<MyOrderSkeleton/>}><Contact/></Suspense>
            },
            {
                path: '/checkout',
                element: <Suspense fallback={<MyOrderSkeleton/>}><Checkout/></Suspense>
            },
            {
                path: '/wishlist',
                element: <PrivateRoute><Suspense fallback={<MyOrderSkeleton/>}><Wishlists/></Suspense></PrivateRoute>
            },
            {
                path: '/carts',
                element: <PrivateRoute><Suspense fallback={<MyOrderSkeleton/>}><Carts/></Suspense></PrivateRoute>
            },
            {
                path: '/productDetailsPage/:id',
                element: <Suspense fallback={<MyOrderSkeleton/>}><ProductDetailsPage/></Suspense>,
                loader: ({params}) => fetch(`https://e-commerce-server-inky-alpha.vercel.app/products/flashSalesProducts/${params.id}`)
            },
            {
                path: '/cashondelivery',
                element: <Suspense fallback={<MyOrderSkeleton/>}><CashOnDelivery/></Suspense>
            },
            {
                path: '/bankormfs',
                element: <Suspense fallback={<MyOrderSkeleton/>}><BankOrMFS/></Suspense>
            },
            {
                path: '/paymentsuccess',
                element: <Suspense fallback={<MyOrderSkeleton/>}><PaymentSuccess/></Suspense>
            },
            {
                path: '/paymentcancel',
                element: <Suspense fallback={<MyOrderSkeleton/>}><PaymentCancel/></Suspense>
            },
            {
                path: '/myorders',
                element: <PrivateRoute><Suspense fallback={<MyOrderSkeleton/>}><MyOrders/></Suspense></PrivateRoute>
            }
        ]
    },
    {
        path: '/settings',
        element: <PrivateRoute><Suspense fallback={<SettingSkeleton/>}><Settings/></Suspense></PrivateRoute>,
        children: [
            {
                index: true,
                element: <Navigate to="profile" replace/> 
            },            
            {
                path: 'profile',
                element: <Profile/>
            },
            {
                path: 'password&security',
                element: <PasswordSecurity/>
            },
            {
                path: 'appearance',
                element: <Appearance/>
            },
            {
                path: 'notifications',
                element: <Notifications/>
            },
            {
                path: 'display',
                element: <Display/>
            }
        ]
    }
])

export default router;