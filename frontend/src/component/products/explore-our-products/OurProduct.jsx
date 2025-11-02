import { useState } from "react";
import PropTypes from 'prop-types';
import useHandleCart from "@/features/cart/hooks/useHandleCart.js";
import useHandleWishlist from "@/features/user/hooks/useHandleWishlist.js";
import { ProductCard } from "@/component/common/product-card/ProductCard.jsx";

const OurProduct = ({product}) => {
    const { product_image, product_title, main_price, rating, user_rating_count, discount_price, _id} = product;
    const [ratings, setRatings] = useState(rating);
    const handleWishlist = useHandleWishlist(product);
    const handleCart = useHandleCart();

    return (
        <>
            <ProductCard
                _id={_id}
                product_image={product_image}
                product_title={product_title}
                main_price={discount_price}
                user_rating_count={user_rating_count}
                discount_price={main_price}
                ratings={ratings}
                setRatings={setRatings}
                handleWishlist={handleWishlist}
                handleCart={handleCart}
                product={product}
            />
        </>
    );
};



OurProduct.propTypes = {
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


export default OurProduct;