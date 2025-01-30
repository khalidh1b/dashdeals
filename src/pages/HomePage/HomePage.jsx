import AllProducts from "../../Components/AllProducts/AllProducts";
import Banner from "../../Components/Banner/Banner";
import BannerProduct from "../../Components/BannerProduct/BannerProduct";
import BestSellingProducts from "../../Components/BestSellingProducts/BestSellingProducts";
import BrowserCategory from "../../Components/BrowseByCategory/BrowserCategory";
import DashDealsPros from "../../Components/DashDealPros/DashDealsPros";
import ExploreOurProducts from "../../Components/ExploreOurProducts/ExploreOurProducts";
import NewArrival from "../../Components/NewArrival/NewArrival";

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