import { Rating } from "@smastrom/react-rating";
import { FaRegHeart } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

export const ProductCard = ({ 
    _id,
    product_image,
    discount_percent,
    product_title,
    discount_price,
    main_price,
    ratings,
    user_rating_count,
    handleWishlist,
    handleCart, 
    setRatings
 }) => {
    return (
        <div className="mx-auto">
            <ProductImage
                _id={_id}
                product_image={product_image}
                discount_percent={discount_percent}
                handleWishlist={handleWishlist}
                handleCart={handleCart}
            />
            <ProductTitle title={product_title}/>
            <ProductPrice 
                discount_price={discount_price}
                main_price={main_price}
            />
            <ProductRating
                ratings={ratings}
                user_rating_count={user_rating_count}
                setRatings={setRatings}
            />
        </div>
    )
};

const ProductImage = ({ 
    _id, 
    product_image, 
    discount_percent, 
    handleWishlist, 
    handleCart 
}) => {
    return (
        <div className="relative">
        <Link to={`/productdetailspage/${_id}`}>
            <img
                className="bg-[#F5F5F5] px-16 pt-16 pb-20 w-[300px] h-[300px] rounded"
                src={product_image}
                alt="G92 Gamepad"
            />
            <span className="bg-[#DB4444] absolute top-5 left-4 text-white py-1 px-4 rounded poppins">
                {discount_percent}
            </span>
        </Link>
        <IoEyeOutline className="bg-[#FFFFFF] dark:bg-slate-400 absolute top-20 left-60 text-[45px] p-2.5 rounded-full" />
        <FaRegHeart
            onClick={handleWishlist}
            className="bg-[#FFFFFF] dark:bg-slate-400 absolute top-3 left-60 text-[45px] p-2.5 rounded-full cursor-pointer"
        />
        <p onClick={handleCart} className="bg-[#000000] absolute bottom-0 w-full text-base poppins font-medium text-[#FFFFFF] py-2.5 text-center rounded-b">
            Add To Cart
        </p>
    </div>
    )
};

const ProductTitle = ({ title }) => {
    return (
        <h4 className="text-[#000000] dark:text-white text-xl poppins font-semibold pt-3">
            {title}
        </h4>
    )
};

const ProductPrice = ({ discount_price, main_price }) => {
    return (
        <div className="flex gap-4 py-2">
            <h5 className="text-[#DB4444] text-xl font-medium">{discount_price}</h5>
            <span className="text-gray-500 font-medium line-through text-xl">
                {main_price}
            </span>
        </div>
    )
};

const ProductRating = ({ ratings, user_rating_count, setRatings }) => {
    return (
        <div className="flex gap-2 items-center">
            <Rating style={{ maxWidth: 130 }} value={ratings} onChange={setRatings} isRequired />
            <span className="text-gray-500 font-semibold text-[18px]">
                ({user_rating_count})
            </span>
        </div>
    )
};

ProductCard.propTypes = {
    _id: PropTypes.string,
    product_image: PropTypes.string,
    discount_percent: PropTypes.string,
    product_title: PropTypes.string,
    discount_price: PropTypes.string,
    main_price: PropTypes.string,
    ratings: PropTypes.number,
    user_rating_count: PropTypes.string,
    handleWishlist: PropTypes.func,
    handleCart: PropTypes.func,
    setRatings: PropTypes.func
};

ProductImage.propTypes = {
    _id: PropTypes.string,
    product_image: PropTypes.string,
    discount_percent: PropTypes.string,
    handleWishlist: PropTypes.func,
    handleCart: PropTypes.func
};
  
ProductTitle.propTypes = {
  title: PropTypes.string,
};
  
ProductPrice.propTypes = {
  discount_price: PropTypes.string,
  main_price: PropTypes.string
};
  
ProductRating.propTypes = {
    ratings: PropTypes.number,
    user_rating_count: PropTypes.string,
    setRatings: PropTypes.func
};