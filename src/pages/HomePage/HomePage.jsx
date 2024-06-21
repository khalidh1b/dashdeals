import AllProducts from "../../Components/AllProducts/AllProducts";
import Banner from "../../Components/Banner/Banner";
import BrowserCategory from "../../Components/BrowseByCategory/BrowserCategory";

const HomePage = () => {
    return (
        <div>
            <Banner></Banner>
            <AllProducts></AllProducts>
            <BrowserCategory></BrowserCategory>
        </div>
    );
};

export default HomePage;