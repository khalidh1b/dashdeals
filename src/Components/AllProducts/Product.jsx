import '@smastrom/react-rating/style.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import useHandleCart from '../../hooks/useHandleCart.js';
import useHandleWishlist from '../../hooks/useHandleWishlist.js';
import { ProductCard } from '../ProductCard/ProductCard.jsx';

const Product = ({product}) => {
    const {_id, discount_percent, product_image, product_title, main_price, discount_price, rating, user_rating_count} = product;
    const [ratings, setRatings] = useState(rating);
    const handleCart = useHandleCart();
    const handleWishlist = useHandleWishlist(product);

    return (
        <>
            <ProductCard
                _id={_id}
                discount_percent={discount_percent}
                product_image={product_image}
                product_title={product_title}
                discount_price={discount_price}
                handleCart={handleCart}
                handleWishlist={handleWishlist}
                main_price={main_price}
                ratings={ratings}
                user_rating_count={user_rating_count}
                setRatings={setRatings}
            />
        </>
    );
};


Product.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        discount_percent: PropTypes.string.isRequired,
        product_image: PropTypes.string.isRequired,
        product_title: PropTypes.string.isRequired,
        main_price: PropTypes.string.isRequired,
        discount_price: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        user_rating_count: PropTypes.string.isRequired,
    }).isRequired,
};

export default Product;