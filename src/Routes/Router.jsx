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
            }
        ]
    }
])

export default router;