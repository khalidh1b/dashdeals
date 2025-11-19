import useHandleCart from "@/features/cart/hooks/useHandleCart";
import useHandleDeleteWishlist from "@/features/user/hooks/useHandleDeleteWishlist";
import useFetchWishlist from "@/features/user/hooks/useFetchWishlist";
import Wishlist from "@/pages/wishlists/Wishlist";
import WishlistSkeleton from '@/pages/wishlists/wishlist-skeleton/WishlistSkeleton';
import { ProductCard } from "@/components/common/product-card/ProductCard";
import { EmptyState } from "@/shared/components/empty-states";

const Wishlists = () => {
    const [products, , isLoading] = useFetchWishlist();
    const handleDelete = useHandleDeleteWishlist();
    const handleCart = useHandleCart();

    return (
        <div className="pt-20 pb-28">
            {products.length !== 0 && 
            <div className="flex md:justify-between justify-evenly items-center md:mx-32">
                <p>Wishlist<span> ({products.length})</span></p>
            </div>
            }

            <div className="grid md:grid-cols-3 grid-cols-1 gap-8 pt-10 md:mx-32">
                {   isLoading && <WishlistSkeleton/>}

                {products.length === 0 
                ? <EmptyState type={'wishlist'}/>
                : products.map(product => (<Wishlist key={product._id} product={product} handleDelete={handleDelete} handleCart={handleCart}/>))
                }
            </div>
        </div>
    );
};

export default Wishlists;