import { Suspense, lazy } from 'react';
import { LoadingSkeleton } from "@/component/common/skeletons/loading-skeleton";

// Lazy load heavy component
const Banner = lazy(() => import("@/component/home/banner/Banner"));
const AllProducts = lazy(() => import("@/component/products/all-products/AllProducts"));
const BannerProduct = lazy(() => import("@/component/products/banner-product/BannerProduct"));
const BestSellingProducts = lazy(() => import("@/component/products/best-selling-products/BestSellingProducts"));
const BrowserCategory = lazy(() => import("@/component/home/browse-by-category/BrowserCategory"));
const DashDealsPros = lazy(() => import("@/component/home/dash-deals-pros/DashDealsPros"));
const ExploreOurProducts = lazy(() => import("@/component/products/explore-our-products/ExploreOurProducts"));
const NewArrival = lazy(() => import("@/component/home/new-arrival/NewArrival"));

const HomePage = () => {
    return (
        <div>
            <Suspense fallback={<LoadingSkeleton />}>
                <Banner/>
            </Suspense>
            <Suspense fallback={<LoadingSkeleton />}>
                <AllProducts/>
            </Suspense>
            <Suspense fallback={<LoadingSkeleton />}>
                <BrowserCategory/>
            </Suspense>
            <Suspense fallback={<LoadingSkeleton />}>
                <BestSellingProducts/>
            </Suspense>
            <Suspense fallback={<LoadingSkeleton />}>
                <BannerProduct/>
            </Suspense>
            <Suspense fallback={<LoadingSkeleton />}>
                <ExploreOurProducts/>
            </Suspense>
            <Suspense fallback={<LoadingSkeleton />}>
                <NewArrival/>
            </Suspense>
            <Suspense fallback={<LoadingSkeleton />}>
                <DashDealsPros/>
            </Suspense>
        </div>
    );
};

export default HomePage;
