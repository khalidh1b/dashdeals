import { Suspense, lazy } from 'react';
import LoadingSkeleton from "@/components/common/skeletons/loading-skeleton";

// Lazy load heavy components
const Banner = lazy(() => import("@/components/home/banner/Banner"));
const AllProducts = lazy(() => import("@/components/products/all-products/AllProducts"));
const BannerProduct = lazy(() => import("@/components/products/banner-product/BannerProduct"));
const BestSellingProducts = lazy(() => import("@/components/products/best-selling-products/BestSellingProducts"));
const BrowserCategory = lazy(() => import("@/components/home/browse-by-category/BrowserCategory"));
const DashDealsPros = lazy(() => import("@/components/home/dash-deals-pros/DashDealsPros"));
const ExploreOurProducts = lazy(() => import("@/components/products/explore-our-products/ExploreOurProducts"));
const NewArrival = lazy(() => import("@/components/home/new-arrival/NewArrival"));

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
