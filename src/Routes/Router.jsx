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
import MyOrders from '../pages/MyOrders/MyOrders';
import ManageMyAccount from '../pages/Account/ManageMyAccount';
import MyProfile from '../pages/Account/MyProfile';
import AddressBook from '../pages/Account/AddressBook';
import MyPaymentOptions from '../pages/Account/MyPaymentOption';
import MyOrder from '../pages/Account/MyOrders';
import MyReturns from '../pages/Account/MyReturns';
import MyCancellations from '../pages/Account/MyCancellations';
import MyWishlist from '../pages/Account/MyWishlist';

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
                path: '/productDetailsPage/:id',
                element: <ProductDetailsPage></ProductDetailsPage>,
                loader: ({params}) => fetch(`http://localhost:5000/flashSalesProducts/${params.id}`)
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
            },
            {
                path: '/myorders',
                element: <MyOrders></MyOrders>
            }
        ]
    },
    {
        path: '/account',
        element: <Account></Account>,
        children: [
            {
                path: 'manageMyAccount',
                element: <ManageMyAccount></ManageMyAccount>
            },
            {
                path: 'myProfile',
                element: <MyProfile></MyProfile>
            },
            {
                path: 'addressBook',
                element: <AddressBook></AddressBook>
            },
            {
                path: 'myPaymentOptions',
                element: <MyPaymentOptions></MyPaymentOptions>
            },
            {
                path: 'myOrder',
                element: <MyOrder></MyOrder>
            },
            {
                path: 'myReturns',
                element: <MyReturns></MyReturns>
            },
            {
                path: 'myCancellations',
                element: <MyCancellations></MyCancellations>
            },
            {
                path: 'myWishlist',
                element: <MyWishlist></MyWishlist>
            }
        ]
    }
])

export default router;