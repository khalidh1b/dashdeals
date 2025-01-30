import { useState } from "react";
import useHandleCart from "../../hooks/useHandleCart";
import useHandleDeleteWishlist from "../../hooks/useHandleDeleteWishlist";
import useFetchWishlist from "../../hooks/useFetchWishlist";
import Wishlist from "./Wishlist";
import WishlistSkeleton from '../../Components/LoadingSkeletons/WishlistSkeleton';
import { ProductCard } from "../../Components/ProductCard/ProductCard";

const Wishlists = () => {
    const [products, , isLoading] = useFetchWishlist();
    const [ratings, setRatings] = useState(20);
    const handleDelete = useHandleDeleteWishlist();
    const handleCart = useHandleCart();

    console.log("products wishlist", products)
    return (
        <div className="pt-20 pb-28">
            <div className="flex md:justify-between justify-evenly items-center md:mx-32">
                <p>Wishlist<span> ({products.length})</span></p>
                <button className="text-[#000] poppins text-base font-medium py-3 px-10 border border-[#000] dark:text-white dark:border-white rounded">Move All To Bag</button>
            </div>

            <div className="grid justify-start md:grid-cols-3 grid-cols-1 gap-8 pt-10 md:mx-32">
                {   isLoading ? <WishlistSkeleton/> :
                    products.map(product => (<Wishlist key={product._id} product={product} handleDelete={handleDelete} handleCart={handleCart}/>))
                }
            </div>

            <div className="flex md:justify-between justify-evenly gap-5 md:mx-20 py-24">
                <div className="flex text-[#DB4444] items-center gap-3 font-semibold">
                    <div className="bg-[#DB4444] rounded py-5 px-2"></div>
                    Just For You
                </div>
                <button className="py-3 px-12 text-[#000] dark:border-white dark:text-white poppins text-base font-medium rounded border-2">See All</button>
            </div>


            <div className="grid md:grid-cols-3 grid-cols-1 justify-center pb-10  gap-10">
                {Array(4).fill().map((_, idx) => (
                    <ProductCard
                        key={idx}
                    />
                ))}
            </div>
        </div>
    );
};

export default Wishlists;