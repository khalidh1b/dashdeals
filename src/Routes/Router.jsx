import { createBrowserRouter } from "react-router-dom";
import Root from '../pages/Root/Root';
import HomePage from '../pages/HomePage/HomePage';
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import About from "../pages/About/About";
import Contact from '../pages/Contact/Contact';
import Checkout from "../pages/CheckOut/Checkout";
import Account from "../pages/Account/Account";
import Wishlist from '../pages/Wishlist/Wishlist';
import Carts from "../pages/Carts/Carts";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import CashOnDelivery from "../pages/CashOnDelivery/CashOnDelivery";
import BankOrMFS from '../pages/BankOrMFS/BankOrMFS';
import PaymentSuccess from '../Components/PaymentSuccess/PaymentSuccess';
import PaymentCancel from '../Components/PaymentCanceled/PaymentCanceled';
import PaymentFailed from '../Components/PaymentFailed/PaymentFailed';


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
                element: <About></About>
            },
            {
                path: '/contact',
                element: <Contact></Contact>
            },
            {
                path: '/checkout',
                element: <Checkout></Checkout>
            },
            {
                path: '/account',
                element: <Account></Account>
            },
            {
                path: '/wishlist',
                element: <Wishlist></Wishlist>
            },
            {
                path: '/carts',
                element: <Carts></Carts>
            },
            {
                path: '/productDetailsPage',
                element: <ProductDetailsPage></ProductDetailsPage>
            },
            {
                path: '/cashondelivery',
                element: <CashOnDelivery></CashOnDelivery>
            },
            {
                path: '/bankormfs',
                element: <BankOrMFS></BankOrMFS>
            },
            {
                path: '/paymentsuccess',
                element: <PaymentSuccess></PaymentSuccess>
            },
            {
                path: '/paymentcancel',
                element: <PaymentCancel></PaymentCancel>
            },
            {
                path: '/paymentfailed',
                element: <PaymentFailed></PaymentFailed>
            }
        ]
    }
])

export default router;