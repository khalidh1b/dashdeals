import { useState } from "react";
import PropTypes from 'prop-types';
import useHandleCart from "@/hooks/cart/useHandleCart.js";
import useHandleWishlist from "@/hooks/wishlist/useHandleWishlist.js";
import { ProductCard } from "@/components/common/product-card/ProductCard.jsx";

const BestSellingProduct = ({ product }) => {
    const {product_image, product_title, main_price, discount_price, rating, user_rating_count, _id} = product;
    const [ratings, setRatings] = useState(rating);

    const handleWishlist = useHandleWishlist(product)
    const handleCart = useHandleCart();

    return (
        <>
            <ProductCard
                _id={_id}
                product_image={product_image}
                product_title={product_title}
                discount_price={discount_price}
                handleCart={handleCart}
                handleWishlist={handleWishlist}
                main_price={main_price}
                ratings={ratings}
                user_rating_count={user_rating_count}
                setRatings={setRatings}
                product={product}
            />
        </>
    );
};


BestSellingProduct.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        _id: PropTypes.string.isRequired,
        discount_percent: PropTypes.string,
        product_image: PropTypes.string.isRequired,
        product_title: PropTypes.string.isRequired,
        main_price: PropTypes.string.isRequired,
        discount_price: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        user_rating_count: PropTypes.string.isRequired,
    }).isRequired,
};


export default BestSellingProduct;