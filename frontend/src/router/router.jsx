import { Navigate, createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import PrivateRoute from "@/router/private-route";

import Root from "@/pages/Root/Root";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";
import { LoadingSkeleton } from "@/components/common/skeletons/loading-skeleton";
import { SettingSkeleton } from "@/components/user/settings/setting-skeleton/setting-skeleton.jsx";

import StripeElementsWrapper from "@/components/payment/stripe-elements-wrapper";

const Navbar = lazy(() => import("@/components/common/navbar/Navbar"));
const Footer = lazy(() => import("@/components/common/footer/Footer"));
const HomePage = lazy(() => import("@/pages/HomePage/HomePage"));
const Signup = lazy(() => import("@/pages/Signup/Signup"));
const Login = lazy(() => import("@/pages/Login/Login"));
const About = lazy(() => import("@/pages/About/About"));
const Contact = lazy(() => import("@/pages/Contact/Contact"));
const Checkout = lazy(() => import("@/pages/CheckOut/Checkout"));
const Carts = lazy(() => import("@/pages/Carts/Carts"));
const ProductDetailsPage = lazy(() => import("@/pages/ProductDetailsPage/ProductDetailsPage"));
const CashOnDelivery = lazy(() => import("@/pages/CashOnDelivery/CashOnDelivery"));
const PaymentSuccess = lazy(() => import("@/components/payment/payment-success/PaymentSuccess"));
const PaymentCancel = lazy(() => import("@/components/payment/payment-canceled/PaymentCanceled"));
const MyOrders = lazy(() => import("@/pages/MyOrders/MyOrders"));
const Wishlists = lazy(() => import("@/pages/Wishlist/Wishlists"));
const Settings = lazy(() => import("@/pages/Settings/Settings"));
const Profile = lazy(() => import("@/components/user/Settings/Profile/Profile"));
const PasswordSecurity = lazy(() => import("@/components/user/settings/Password&Security/Password&Security"));
const Appearance = lazy(() => import("@/components/user/settings/Appearance/Appearance"));
const Notifications = lazy(() => import("@/components/user/settings/Notifications/Notifications"));
const Display = lazy(() => import("@/components/user/settings/Display/Display"));
const MyCancellations = lazy(() => import("@/pages/MyCancellations/MyCancellations"));
const MyReviews = lazy(() => import("@/pages/MyReviews/MyReviews"));

const Loadable = (Component, Fallback = <LoadingSkeleton />) => (
  <Suspense fallback={Fallback}>
    <Component />
  </Suspense>
);

const publicRoutes = [
    { path: "/", element: Loadable(HomePage) },
    { path: "/signup", element: Loadable(Signup) },
    { path: "/login", element: Loadable(Login) },
    { path: "/about", element: Loadable(About) },
    { path: "/contact", element: Loadable(Contact) },
    {
        path: "/productDetailsPage/:id",
        element: Loadable(ProductDetailsPage),
        loader: ({ params }) =>
            fetch(`https://e-commerce-server-inky-alpha.vercel.app/products/flashSalesProducts/${params.id}`),
    },
];

const privateRoutes = [
  { path: "/wishlist", element: Loadable(Wishlists) },
  { path: "/carts", element: Loadable(Carts) },
  { path: "/myorders", element: Loadable(MyOrders) },
  { path: "/my-cancellations", element: Loadable(MyCancellations) },
  { path: "/my-reviews", element: Loadable(MyReviews) },
  {
    path: "/checkout",
    element: (
      <Suspense fallback={<LoadingSkeleton />}>
        <StripeElementsWrapper>
          {Loadable(Checkout)}
        </StripeElementsWrapper>
      </Suspense>
    )
  },
  { path: "/cashondelivery", element: Loadable(CashOnDelivery) },
    { 
      path: "/paymentsuccess", 
      element: Loadable(PaymentSuccess)
    },
    { 
      path: "/paymentcancel", 
      element: Loadable(PaymentCancel)
    },];

const settingsRoutes = [
  { index: true, element: <Navigate to="profile" replace /> },
  { path: "profile", element: Loadable(Profile) },
  { path: "password&security", element: Loadable(PasswordSecurity) },
  { path: "appearance", element: Loadable(Appearance) },
  { path: "notifications", element: Loadable(Notifications) },
  { path: "display", element: Loadable(Display) },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      ...publicRoutes,
      ...privateRoutes.map(route => ({
        ...route,
        element: <PrivateRoute>{route.element}</PrivateRoute>,
      })),
    ],
  },
  {
    path: "/settings",
    element: (
      <PrivateRoute>
        <Navbar/>
        <Suspense fallback={<SettingSkeleton />}>
          <Settings />
        </Suspense>
        <Footer/>
      </PrivateRoute>
    ),
    children: settingsRoutes,
  },
]);

export default router;