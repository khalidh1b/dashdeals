import { Navigate, createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import PrivateRoute from "@/router/private-route";

import Root from "@/pages/root/Root";
import ErrorPage from "@/pages/error-page/ErrorPage";
import { LoadingSkeleton } from "@/components/common/skeletons/loading-skeleton";
import { SettingSkeleton } from "@/components/user/settings/setting-skeleton/setting-skeleton.jsx";

import StripeElementsWrapper from "@/components/payment/stripe-elements-wrapper";

const Navbar = lazy(() => import("@/components/common/navbar/Navbar"));
const Footer = lazy(() => import("@/components/common/footer/Footer"));
const HomePage = lazy(() => import("@/pages/home-page/HomePage"));
const Signup = lazy(() => import("@/pages/signup/Signup"));
const Login = lazy(() => import("@/pages/login/Login"));
const About = lazy(() => import("@/pages/about/About"));
const Contact = lazy(() => import("@/pages/contact/Contact"));
const Checkout = lazy(() => import("@/pages/checkout/Checkout"));
const Carts = lazy(() => import("@/pages/carts/Carts"));
const ProductDetailsPage = lazy(() => import("@/pages/product-details-page/ProductDetailsPage"));
const CashOnDelivery = lazy(() => import("@/pages/cash-on-delivery/CashOnDelivery"));
const PaymentSuccess = lazy(() => import("@/components/payment/payment-success/PaymentSuccess"));
const PaymentCancel = lazy(() => import("@/components/payment/payment-canceled/PaymentCanceled"));
const MyOrders = lazy(() => import("@/pages/my-orders/my-orders"));
const Wishlists = lazy(() => import("@/pages/wishlist/Wishlists"));
const Settings = lazy(() => import("@/pages/settings/Settings"));
const Profile = lazy(() => import("@/components/user/settings/Profile/Profile"));
const PasswordSecurity = lazy(() => import("@/components/user/settings/Password&Security/Password&Security"));
const Appearance = lazy(() => import("@/components/user/settings/Appearance/Appearance"));
const Notifications = lazy(() => import("@/components/user/settings/Notifications/Notifications"));
const Display = lazy(() => import("@/components/user/settings/Display/Display"));
const MyCancellations = lazy(() => import("@/pages/my-cancellations/MyCancellations"));
const MyReviews = lazy(() => import("@/pages/my-reviews/MyReviews"));

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