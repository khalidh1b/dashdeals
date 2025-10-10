import AllProducts from "@/components/products/all-products/AllProducts";
import Banner from "@/components/home/banner/Banner";
import BannerProduct from "@/components/products/banner-product/BannerProduct";
import BestSellingProducts from "@/components/products/best-selling-products/BestSellingProducts";
import BrowserCategory from "@/components/home/browse-by-category/BrowserCategory";
import DashDealsPros from "@/components/home/dash-deals-pros/DashDealsPros";
import ExploreOurProducts from "@/components/products/explore-our-products/ExploreOurProducts";
import NewArrival from "@/components/home/new-arrival/NewArrival";

const HomePage = () => {
    return (
        <div>
            <Banner/>
            <AllProducts/>
            <BrowserCategory/>
            <BestSellingProducts/>
            <BannerProduct/>
            <ExploreOurProducts/>
            <NewArrival/>
            <DashDealsPros/>
        </div>
    );
};

export default HomePage;