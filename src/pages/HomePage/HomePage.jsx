import AllProducts from "../../Components/AllProducts/AllProducts";
import Banner from "../../Components/Banner/Banner";
import BannerProduct from "../../Components/BannerProduct/BannerProduct";
import BestSellingProducts from "../../Components/BestSellingProducts/BestSellingProducts";
import BrowserCategory from "../../Components/BrowseByCategory/BrowserCategory";
import ExploreOurProducts from "../../Components/ExploreOurProducts/ExploreOurProducts";
import NewArrival from "../../Components/NewArrival/NewArrival";

const HomePage = () => {
    return (
        <div>
            <Banner></Banner>
            <AllProducts></AllProducts>
            <BrowserCategory></BrowserCategory>
            <BestSellingProducts></BestSellingProducts>
            <BannerProduct></BannerProduct>
            <ExploreOurProducts></ExploreOurProducts>
            <NewArrival></NewArrival>
        </div>
    );
};

export default HomePage;