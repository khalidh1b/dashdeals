import PropTypes from "prop-types"; 
import { ProductCard } from "@/components/common/product-card/ProductCard";

const Wishlist = ({ product, handleDelete, handleCart }) => {
    const { 
        _id, 
        discount_percent, 
        discount_price, 
        main_price, 
        product_image, 
        product_title, 
        rating, 
        user_rating_count 
    } = product;

    return (
        <div className="md:mx-0 mx-auto">
            <ProductCard
                _id={_id}
                discount_percent={discount_percent}
                discount_price={discount_price}
                handleCart={handleCart}
                main_price={main_price}
                product_image={product_image}
                product_title={product_title}
                ratings={rating}
                user_rating_count={user_rating_count}
                handleDelete={handleDelete}
                isWishlist={true}
            />
        </div>
    );
};

Wishlist.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        product_image: PropTypes.string.isRequired,
        product_title: PropTypes.string.isRequired,
        discount_percent: PropTypes.string,
        main_price: PropTypes.string.isRequired,
        discount_price: PropTypes.string.isRequired,
        rating: PropTypes.number,
        user_rating_count: PropTypes.string,
    }).isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleCart: PropTypes.func.isRequired,
};

export default Wishlist;